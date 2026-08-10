import { activities as baseActivities } from '../data/activities'
import { additionalActivities } from '../data/activityLibrary'
import { calculateAge, isAgeInRange } from './age'
import type { Activity, ActivityCategory, ActivityType } from '../types/models'

export interface DailyProgramEngineOptions {
  childBirthDate: string
  today: Date
  completedActivityIds?: string[]
  categoryWeights?: Partial<Record<ActivityCategory, number>>
}

export interface DailyProgramResult {
  ageGroup: string
  activities: Activity[]
}

const fullActivityPool: Activity[] = [...baseActivities, ...additionalActivities]

function getAgeGroup(totalMonths: number): string {
  if (totalMonths <= 3) return '0-3 ay'
  if (totalMonths <= 6) return '4-6 ay'
  if (totalMonths <= 9) return '7-9 ay'
  if (totalMonths <= 12) return '10-12 ay'
  if (totalMonths <= 18) return '13-18 ay'
  if (totalMonths <= 24) return '19-24 ay'
  if (totalMonths <= 36) return '2-3 yaş'
  if (totalMonths <= 48) return '3-4 yaş'
  if (totalMonths <= 60) return '4-5 yaş'
  if (totalMonths <= 72) return '5-6 yaş'
  if (totalMonths <= 96) return '6-8 yaş'
  return '8-10 yaş'
}

function getCategoryWeights(categoryWeights?: Partial<Record<ActivityCategory, number>>): Record<ActivityCategory, number> {
  return {
    cognitive: categoryWeights?.cognitive ?? 1,
    language: categoryWeights?.language ?? 1,
    motor: categoryWeights?.motor ?? 1,
    social: categoryWeights?.social ?? 1,
    creativity: categoryWeights?.creativity ?? 1,
  }
}

function isInteractiveType(activityType?: ActivityType): boolean {
  return activityType !== undefined && ['visual', 'game', 'matching', 'memory', 'quiz'].includes(activityType)
}

function shouldPreferInteractive(totalMonths: number): boolean {
  return totalMonths > 3
}

export function generateDailyProgram({ childBirthDate, today, completedActivityIds = [], categoryWeights }: DailyProgramEngineOptions): DailyProgramResult {
  const ageInfo = calculateAge(childBirthDate, today)
  const ageGroup = getAgeGroup(ageInfo.totalMonths)
  const weights = getCategoryWeights(categoryWeights)
  const completedRecently = new Set(completedActivityIds)

  const eligible = fullActivityPool.filter((activity) => {
    const inRange = isAgeInRange(ageInfo.totalMonths, activity.ageMin, activity.ageMax)
    if (!inRange) return false

    const blockedByCooldown = activity.repeatCooldownDays > 0 && completedRecently.has(activity.id)
    return !blockedByCooldown
  })

  const fallbackPool = fullActivityPool.filter((activity) => isAgeInRange(ageInfo.totalMonths, activity.ageMin, activity.ageMax))

  const byCategory = Object.entries(weights).reduce<Record<ActivityCategory, Activity[]>>((acc, [category, weight]) => {
    acc[category as ActivityCategory] = eligible.filter((activity) => activity.category === category).slice(0, Math.max(1, 3 * weight))
    return acc
  }, { cognitive: [], language: [], motor: [], social: [], creativity: [] })

  const selected: Activity[] = []
  const selectedIds = new Set<string>()
  const selectedCategories = new Set<ActivityCategory>()
  const categories: ActivityCategory[] = ['cognitive', 'language', 'motor', 'social', 'creativity']
  const categoryOrder = [...categories].sort((a, b) => (weights[b] ?? 0) - (weights[a] ?? 0))
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

  const pickBestActivity = (items: Activity[], hasInteractiveSelection: boolean): Activity | undefined => {
    if (items.length === 0) return undefined

    const ranked = items
      .filter((activity) => !selectedIds.has(activity.id))
      .map((activity) => {
        const baseScore = (typePriority[activity.activityType ?? 'guided'] ?? 1) * 3 + (weights[activity.category] ?? 1)
        const categoryPenalty = selectedCategories.has(activity.category) ? 5 : 0
        const interactionBonus = shouldPreferInteractive(ageInfo.totalMonths) && isInteractiveType(activity.activityType) && !hasInteractiveSelection ? 6 : 0

        return { activity, score: baseScore + interactionBonus - categoryPenalty }
      })
      .sort((a, b) => b.score - a.score)

    return ranked[0]?.activity
  }

  let hasInteractiveSelection = false

  categoryOrder.forEach((category) => {
    const items = byCategory[category]
    const item = pickBestActivity(items, hasInteractiveSelection)

    if (item) {
      selected.push(item)
      selectedIds.add(item.id)
      selectedCategories.add(item.category)
      if (!hasInteractiveSelection && isInteractiveType(item.activityType)) {
        hasInteractiveSelection = true
      }
    } else {
      const fallbackItems = fallbackPool.filter((activity) => activity.category === category && !selectedIds.has(activity.id))
      const fallbackItem = pickBestActivity(fallbackItems, hasInteractiveSelection)
      if (fallbackItem) {
        selected.push(fallbackItem)
        selectedIds.add(fallbackItem.id)
        selectedCategories.add(fallbackItem.category)
        if (!hasInteractiveSelection && isInteractiveType(fallbackItem.activityType)) {
          hasInteractiveSelection = true
        }
      }
    }
  })

  const targetCount = Math.min(6, Math.max(selected.length, 4))
  const remainingPool = eligible.filter((activity) => !selectedIds.has(activity.id))
  const fallbackRemainingPool = fallbackPool.filter((activity) => !selectedIds.has(activity.id))

  while (selected.length < targetCount) {
    const pool = remainingPool.length > 0 ? remainingPool : fallbackRemainingPool
    const nextActivity = pickBestActivity(pool, hasInteractiveSelection)
    if (!nextActivity) break

    selected.push(nextActivity)
    selectedIds.add(nextActivity.id)
    selectedCategories.add(nextActivity.category)
    if (!hasInteractiveSelection && isInteractiveType(nextActivity.activityType)) {
      hasInteractiveSelection = true
    }

    const nextIndex = pool.findIndex((activity) => activity.id === nextActivity.id)
    if (nextIndex >= 0) pool.splice(nextIndex, 1)
  }

  const finalActivities = selected.slice(0, targetCount)
  if (finalActivities.length === 0) {
    const fallbackActivity = fallbackPool[0]
    if (fallbackActivity) {
      return { ageGroup, activities: [fallbackActivity] }
    }
  }

  return {
    ageGroup,
    activities: finalActivities,
  }
}
