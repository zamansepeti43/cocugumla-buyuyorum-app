import { activities as baseActivities } from '../data/activities'
import { additionalActivities } from '../data/activityLibrary'
import { calculateAge, getAgeGroup, isAgeInRange } from './age'
import type { Activity, ActivityCategory, ActivityInteractionId } from '../types/models'

export interface DailyProgramEngineOptions {
  childBirthDate: string
  today: Date
  completedActivityIds?: string[]
  categoryWeights?: Partial<Record<ActivityCategory, number>>
}

export interface DailyProgramResult {
  ageGroup: string
  activities: Activity[]
  missingRoles: string[]
}

const fullActivityPool: Activity[] = [...baseActivities, ...additionalActivities]

const SOUND_INTERACTIONS: ActivityInteractionId[] = ['sound-cue', 'sound-object', 'animal-finder', 'word-pick']
const VISUAL_INTERACTIONS: ActivityInteractionId[] = ['contrast-track', 'balloon-track', 'touch-and-see', 'motion-track', 'moving-shape', 'picture-match']

type DailyRole = 'sound' | 'visual' | 'game' | 'home'

const ROLE_ORDER: DailyRole[] = ['sound', 'visual', 'game', 'home', 'home']

function getCategoryWeights(categoryWeights?: Partial<Record<ActivityCategory, number>>): Record<ActivityCategory, number> {
  return {
    cognitive: categoryWeights?.cognitive ?? 1,
    language: categoryWeights?.language ?? 1,
    motor: categoryWeights?.motor ?? 1,
    social: categoryWeights?.social ?? 1,
    creativity: categoryWeights?.creativity ?? 1,
  }
}

function getActivityRole(activity: Activity): DailyRole {
  const id = activity.interactionId
  if (id && SOUND_INTERACTIONS.includes(id)) return 'sound'
  if (id && VISUAL_INTERACTIONS.includes(id)) return 'visual'
  if (id) return 'game'
  return 'home'
}

function roleLabel(role: DailyRole): string {
  switch (role) {
    case 'sound': return 'Sesli aktivite'
    case 'visual': return 'Görsel aktivite'
    case 'game': return 'Oyun aktivitesi'
    case 'home': return 'Evde yapılan aktivite'
  }
}

export function generateDailyProgram({ childBirthDate, today, completedActivityIds = [], categoryWeights }: DailyProgramEngineOptions): DailyProgramResult {
  const ageInfo = calculateAge(childBirthDate, today)
  const ageGroup = getAgeGroup(ageInfo.totalMonths)
  const weights = getCategoryWeights(categoryWeights)
  const completedRecently = new Set(completedActivityIds)

  const inRange = (activity: Activity): boolean => isAgeInRange(ageInfo.totalMonths, activity.ageMin, activity.ageMax)

  const eligible = fullActivityPool.filter((activity) => {
    if (!inRange(activity)) return false
    const blockedByCooldown = activity.repeatCooldownDays > 0 && completedRecently.has(activity.id)
    return !blockedByCooldown
  })

  const fallbackPool = fullActivityPool.filter(inRange)

  const typePriority: Record<string, number> = {
    visual: 4,
    game: 4,
    matching: 3,
    memory: 3,
    sorting: 3,
    quiz: 2,
    creative: 2,
    guided: 1,
  }

  const pickBest = (items: Activity[]): Activity | undefined => {
    if (items.length === 0) return undefined

    const ranked = items
      .map((activity) => {
        const baseScore = (typePriority[activity.activityType ?? 'guided'] ?? 1) * 3 + (weights[activity.category] ?? 1)
        const interactiveBonus = activity.interactionId ? 4 : 0
        return { activity, score: baseScore + interactiveBonus }
      })
      .sort((a, b) => b.score - a.score)

    return ranked[0]?.activity
  }

  const selected: Activity[] = []
  const selectedIds = new Set<string>()
  const missingRoles: string[] = []

  ROLE_ORDER.forEach((role) => {
    const roleEligible = eligible.filter(
      (activity) => !selectedIds.has(activity.id) && getActivityRole(activity) === role,
    )
    const pick = pickBest(roleEligible) ?? pickBest(fallbackPool.filter(
      (activity) => !selectedIds.has(activity.id) && getActivityRole(activity) === role,
    ))

    if (pick) {
      selected.push(pick)
      selectedIds.add(pick.id)
      return
    }

    missingRoles.push(roleLabel(role))
    const filler = pickBest(eligible.filter((activity) => !selectedIds.has(activity.id)))
      ?? pickBest(fallbackPool.filter((activity) => !selectedIds.has(activity.id)))
    if (filler) {
      selected.push(filler)
      selectedIds.add(filler.id)
    }
  })

  return {
    ageGroup,
    activities: selected,
    missingRoles,
  }
}