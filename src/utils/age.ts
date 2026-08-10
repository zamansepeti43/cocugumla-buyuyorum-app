export interface AgeInfo {
  years: number
  months: number
  totalMonths: number
  label: string
  ageGroup: string
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

  let ageGroup = 'Bebeklik'
  if (totalMonths >= 72) ageGroup = 'Okul çağı'
  else if (totalMonths >= 48) ageGroup = 'Okul öncesi 4-6 yaş'
  else if (totalMonths >= 24) ageGroup = 'Erken çocukluk 2-4 yaş'
  else if (totalMonths >= 12) ageGroup = 'İlk adımlar 1-2 yaş'

  return { years, months, totalMonths, label, ageGroup }
}

export function getMaxBirthDate(): string {
  return new Date().toISOString().split('T')[0]
}
