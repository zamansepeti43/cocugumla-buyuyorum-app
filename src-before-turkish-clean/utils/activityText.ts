import type { Activity } from '../types/models'

const MAX_SHORT = 105

export function activityShortDescription(activity: Activity): string {
  const { description } = activity
  if (description.length <= MAX_SHORT) return description

  const firstSentence = description.split(/[.?!]/)[0].trim()
  if (firstSentence.length <= MAX_SHORT) return firstSentence

  const cut = description.slice(0, MAX_SHORT)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : MAX_SHORT).trimEnd()}…`
}