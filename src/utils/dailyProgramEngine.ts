import { activities as baseActivities } from '../data/activities'
import { additionalActivities } from '../data/activityLibrary'
import { calculateAge, isAgeInRange } from './age'
import type { Activity, ActivityCategory } from '../types/models'

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

export function generateDailyProgram({ childBirthDate, today, completedActivityIds = [], categoryWeights }: DailyProgramEngineOptions): DailyProgramResult {
  const ageInfo = calculateAge(childBirthDate, today)
  const ageGroup = getAgeGroup(ageInfo.totalMonths)
  const weights = getCategoryWeights(categoryWeights)

  const eligible = fullActivityPool.filter((activity) => {
    const inRange = isAgeInRange(ageInfo.totalMonths, activity.ageMin, activity.ageMax)
    const notCompletedRecently = !completedActivityIds.includes(activity.id)
    if (!inRange || !notCompletedRecently) return false
    return true
  })

  const byCategory = Object.entries(weights).reduce<Record<ActivityCategory, Activity[]>>((acc, [category, weight]) => {
    acc[category as ActivityCategory] = eligible.filter((activity) => activity.category === category).slice(0, Math.max(1, 3 * weight))
    return acc
  }, { cognitive: [], language: [], motor: [], social: [], creativity: [] })

  const selected: Activity[] = []
  const categories: ActivityCategory[] = ['cognitive', 'language', 'motor', 'social', 'creativity']
  const categoryOrder = [...categories].sort((a, b) => (weights[b] ?? 0) - (weights[a] ?? 0))

  categoryOrder.forEach((category) => {
    const items = byCategory[category]
    if (items.length > 0) {
      const item = items[Math.floor(Math.random() * items.length)]
      selected.push(item)
    }
  })

  const finalActivities = selected.slice(0, 4)
  return {
    ageGroup,
    activities: finalActivities,
  }
}
