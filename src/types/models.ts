export const activityCategories = ['cognitive', 'language', 'motor', 'social', 'creativity'] as const

export type ActivityCategory = (typeof activityCategories)[number]
export type ActivityDifficulty = 'easy' | 'medium'

export interface Activity {
  id: string
  title: string
  description: string
  ageMin: number
  ageMax: number
  category: ActivityCategory
  duration: number
  materials: string[]
  instructions: string[]
  parentTip: string
  benefits: string[]
  difficulty: ActivityDifficulty
  completed: boolean
  isPremium: boolean
}

export interface ChildProfile {
  id: string
  name: string
  birthDate: string
  createdAt: string
}

export interface ActivityCompletion {
  activityId: string
  childId: string
  completedAt: string
}

export interface AppData {
  hasOnboarded: boolean
  children: ChildProfile[]
  activeChildId: string | null
  completions: ActivityCompletion[]
}

export interface EnglishWord {
  id: string
  word: string
  translation: string
  emoji: string
  audioUrl?: string
}

export type EnglishCategory = 'animals' | 'colors' | 'family' | 'daily-life'

export interface EnglishLesson {
  id: string
  title: string
  category: EnglishCategory
  ageMin: number
  ageMax: number
  duration: number
  words: EnglishWord[]
  isPremium: boolean
}

export interface EnglishProgress {
  childId: string
  lessonId: string
  completedAt: string
}
