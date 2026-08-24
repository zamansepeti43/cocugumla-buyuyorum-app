import { researchActivities } from './researchActivities'

export const categoryMeta = {
  cognitive: { label: 'Bilişsel', color: '#6C63FF', icon: '🧠' },
  language: { label: 'Dil', color: '#3B82F6', icon: '💬' },
  motor: { label: 'Motor', color: '#10B981', icon: '🏃' },
  social: { label: 'Sosyal', color: '#F59E0B', icon: '🤝' },
  creativity: { label: 'Yaratıcılık', color: '#EC4899', icon: '🎨' },
} as const

export const allActivities = researchActivities

// Eski modüllerden kalan import'lar için geriye dönük uyumluluk.
export const activities = allActivities
