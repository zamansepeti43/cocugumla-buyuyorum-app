import type { Activity } from '../types/models'

export interface AgeInfo {
  years: number
  months: number
  totalMonths: number
  label: string
  ageGroup: string
}

const AGE_GROUPS: Array<{ label: string; min: number; max: number }> = [
  { label: '0-3 ay', min: 0, max: 3 },
  { label: '4-6 ay', min: 4, max: 6 },
  { label: '7-9 ay', min: 7, max: 9 },
  { label: '10-12 ay', min: 10, max: 12 },
  { label: '13-18 ay', min: 13, max: 18 },
  { label: '19-24 ay', min: 19, max: 24 },
  { label: '2-3 yaş', min: 25, max: 36 },
  { label: '3-4 yaş', min: 37, max: 48 },
  { label: '4-5 yaş', min: 49, max: 60 },
  { label: '5-6 yaş', min: 61, max: 72 },
  { label: '6-8 yaş', min: 73, max: 96 },
  { label: '8-10 yaş', min: 97, max: 120 },
  { label: '10-12 yaş', min: 121, max: 144 },
]

export function getAgeGroup(totalMonths: number): string {
  const group = AGE_GROUPS.find((item) => totalMonths <= item.max)
  return group?.label ?? '10-12 yaş'
}

export function getAgeGroups(): Array<{ label: string; min: number; max: number }> {
  return AGE_GROUPS
}

function formatAgePoint(totalMonths: number): string {
  if (totalMonths < 24) return `${totalMonths} ay`
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return months > 0 ? `${years} yaş ${months} ay` : `${years} yaş`
}

export function calculateAge(birthDate: string, today = new Date()): AgeInfo {
  const birth = new Date(`${birthDate}T00:00:00`)
  let totalMonths = (today.getFullYear() - birth.getFullYear()) * 12
  totalMonths += today.getMonth() - birth.getMonth()

  if (today.getDate() < birth.getDate()) totalMonths -= 1
  totalMonths = Math.max(0, totalMonths)

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const label = years > 0 ? `${years} yaş ${months} ay` : `${months} aylık`

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