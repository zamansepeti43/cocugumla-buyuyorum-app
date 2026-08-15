import type { Activity } from '../types/models'

export interface AgeInfo {
  years: number
  months: number
  totalMonths: number
  label: string
  ageGroup: string
}

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
  if (totalMonths <= 96) return '6-8 ya�Y'
  return '8-10 ya�Y'
}

function formatAgePoint(totalMonths: number): string {
  if (totalMonths < 24) return `${totalMonths} ay`
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return months > 0 ? `${years} ya�Y ${months} ay` : `${years} ya�Y`
}

export function calculateAge(birthDate: string, today = new Date()): AgeInfo {
  const birth = new Date(`${birthDate}T00:00:00`)
  let totalMonths = (today.getFullYear() - birth.getFullYear()) * 12
  totalMonths += today.getMonth() - birth.getMonth()

  if (today.getDate() < birth.getDate()) totalMonths -= 1
  totalMonths = Math.max(0, totalMonths)

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const label = years > 0 ? `${years} ya�Y ${months} ay` : `${months} aylık`

  const ageGroup = getAgeGroup(totalMonths)

  return { years, months, totalMonths, label, ageGroup }
}

export function isAgeInRange(totalMonths: number, ageMin: number, ageMax: number): boolean {
  return totalMonths >= ageMin && totalMonths <= ageMax
}

export function formatAgeRange(ageMin: number, ageMax: number): string {
  return `${formatAgePoint(ageMin)} - ${formatAgePoint(ageMax)}`
}

export function getMaxBirthDate(): string {
  return new Date().toISOString().split('T')[0]
}

export interface DailyProgram {
  developmentActivity: string
  gameActivity: string
}

export function selectDailyProgram(
  ageInfo: AgeInfo,
  completedIds: Set<string>,
  allActivities: Activity[]
): DailyProgram {
  const suitable = allActivities.filter(
    (activity) =>
      ageInfo.totalMonths >= activity.ageMin &&
      ageInfo.totalMonths <= activity.ageMax &&
      !completedIds.has(activity.id)
  )

  const developmentActivities = suitable.filter(
    (a) => a.category !== 'creativity' && a.category !== 'language'
  )

  const gameActivities = suitable.filter(
    (a) =>
      ['game', 'quiz', 'matching', 'memory', 'sorting', 'creative', 'visual'].includes(
        a.activityType ?? ''
      )
  )

  const selectFirst = (activities: Activity[]): Activity | undefined => {
    const uncompleted = activities.filter(
      (a) => !completedIds.has(a.id)
    )
    return uncompleted[0] || activities[0]
  }

  // Fallback activity IDs when no suitable activities found
  const fallbackDevId = allActivities.find(
    (a) => a.category !== 'creativity' && a.category !== 'language'
  )?.id ?? 'cog-color-hunt'

  const fallbackGameId = allActivities.find(
    (a) => ['game', 'quiz', 'matching', 'memory', 'sorting', 'creative', 'visual'].includes(
      a.activityType ?? ''
    )
  )?.id ?? 'cog-color-hunt'

  return {
    developmentActivity: selectFirst(developmentActivities)?.id || fallbackDevId,
    gameActivity: selectFirst(gameActivities)?.id || fallbackGameId,
  }
}