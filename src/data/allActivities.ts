import { researchActivities } from './researchActivities'

export const categoryMeta = {
  cognitive: { label: 'Bilişsel', color: '#6C63FF' },
  language: { label: 'Dil', color: '#3B82F6' },
  motor: { label: 'Motor', color: '#10B981' },
  social: { label: 'Sosyal', color: '#F59E0B' },
  creativity: { label: 'Yaratıcılık', color: '#EC4899' },
} as const

export const allActivities = researchActivities
