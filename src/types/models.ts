export const activityCategories = ['cognitive', 'language', 'motor', 'social', 'creativity'] as const

export type ActivityCategory = (typeof activityCategories)[number]

export type ActivityDifficulty = 'easy' | 'medium'

export type ActivityType =
  | 'guided'
  | 'visual'
  | 'game'
  | 'quiz'
  | 'matching'
  | 'memory'
  | 'sorting'
  | 'creative'

export type WorldId =
  | 'forest'
  | 'space'
  | 'sea'
  | 'english'
  | 'math'
  | 'speech'
  | 'games'
  | 'stories'
  | 'fairy-tales'

export type ActivityInteractionId =
  | 'contrast-track'
  | 'balloon-track'
  | 'touch-and-see'
  | 'sorting-game'
  | 'color-match-mini'
  | 'missing-shape'
  | 'animal-finder'
  | 'motion-track'
  | 'size-picker'
  | 'twin-match'
  | 'sound-object'
  | 'moving-shape'
  | 'sound-cue'
  | 'drag-sort'
  | 'picture-match'
  | 'pattern-complete'
  | 'memory-grid'
  | 'shape-puzzle'
  | 'word-pick'
  | 'logic-grid'
  | 'attention-spot'
  | 'sequence-memory'
  | 'mini-tetris'
  | 'candy-match'
  | 'reaction-target'
  | 'strategy-plan'
  | 'strategy-maze'
  | 'complex-puzzle'
  | 'advanced-memory'
  | 'box-opening'

export type ActivitySkill = string

export interface Activity {
  id: string
  title: string
  description: string
  purpose?: string
  ageMin: number
  ageMax: number
  category: ActivityCategory
  skill: ActivitySkill
  duration: number
  materials: string[]
  instructions: string[]
  parentTip: string
  benefits: string[]
  difficulty: ActivityDifficulty
  safetyNotes: string[]
  variations: string[]
  repeatCooldownDays: number
  activityType?: ActivityType
  interactionId?: ActivityInteractionId
  completed: boolean
  isPremium: boolean
  imageUrl?: string
  skills?: string[]
}

export interface ChildProfile {
  id: string
  name: string
  birthDate: string
  createdAt: string
  interests?: string[]
  notes?: string[]
}

export interface ActivityCompletion {
  activityId: string
  childId: string
  completedAt: string
}

export interface ActivityObservation {
  id: string
  childId: string
  activityId?: string
  createdAt: string
  mood?: 'happy' | 'calm' | 'curious' | 'tired' | 'fussy' | 'other'
  result?: 'did-well' | 'partly' | 'not-yet' | 'not-tried'
  note?: string
}

export interface DailyProgramRecord {
  childId: string
  date: string
  activityIds: string[]
}

export interface AppData {
  hasOnboarded: boolean
  children: ChildProfile[]
  activeChildId: string | null
  completions: ActivityCompletion[]
  favorites: string[]
  observations: ActivityObservation[]
  progressRecords: ProgressRecord[]
  childProgress: ChildProgress[]
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

export interface World {
  id: WorldId
  title: string
  description: string
  icon: string
  color: string
  minAge: number
  maxAge: number
  order: number
}

export interface Section {
  id: string
  worldId: WorldId
  title: string
  description: string
  order: number
  minAge: number
  maxAge: number
  requiredStars?: number
}

export type ContentType = 'lesson' | 'game' | 'story' | 'interactive'

export interface ContentItem {
  id: string
  sectionId: string
  type: ContentType
  title: string
  description: string
  order: number
  interactionId?: ActivityInteractionId
  isLocked: boolean
  minAge: number
  maxAge: number
  duration: number
  parentTip?: string
  benefits?: string[]
  materials?: string[]
  instructions?: string[]
}

export interface ProgressRecord {
  childId: string
  worldId: WorldId
  sectionId: string
  contentId: string
  completed: boolean
  completedAt?: string
  stars: number
  attempts: number
}

export interface ChildProgress {
  childId: string
  currentWorld: WorldId
  unlockedSections: string[]
  completedContent: string[]
  totalStars: number
  lastPlayedAt: string
}

export interface Story {
  id: string
  title: string
  description: string
  ageMin: number
  ageMax: number
  duration: number
  pages: Array<{
    text: string
    image?: string
    sound?: string
  }>
  moral?: string
}
