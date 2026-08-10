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
  if (totalMonths <= 96) return '6-8 yaş'
  return '8-10 yaş'
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
