import { researchActivities } from './researchActivities'

export const categoryMeta = {
  cognitive: { label: 'Bilişsel', icon: '🧠', color: '#6C63FF' },
  language: { label: 'Dil', icon: '💬', color: '#3B82F6' },
  motor: { label: 'Motor', icon: '🏃', color: '#10B981' },
  social: { label: 'Sosyal', icon: '❤️', color: '#F59E0B' },
  creativity: { label: 'Yaratıcılık', icon: '🎨', color: '#EC4899' },
} as const

export const allActivities = researchActivities
