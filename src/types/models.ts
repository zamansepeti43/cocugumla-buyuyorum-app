export const activityCategories = ['cognitive', 'language', 'motor', 'social', 'creativity'] as const

export type ActivityCategory = (typeof activityCategories)[number]
export type ActivityDifficulty = 'easy' | 'medium'
export type ActivityType = 'guided' | 'visual' | 'game' | 'quiz' | 'matching' | 'memory' | 'sorting' | 'creative'
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
export type ActivitySkill =
  | 'attention'
  | 'memory'
  | 'problem-solving'
  | 'early-math'
  | 'visual-tracking'
  | 'listening'
  | 'expressive-language'
  | 'receptive-language'
  | 'fine-motor'
  | 'gross-motor'
  | 'coordination'
  | 'self-regulation'
  | 'social-connection'
  | 'empathy'
  | 'creativity'
  | 'sensory-play'
  | 'planning'
  | 'responsibility'
  | 'göz teması'
  | 'görsel takip'
  | 'duygu farkı'
  | 'ses farkındalığı'
  | 'kafa ve kol koordinasyonu'
  | 'duyusal keşif'
  | 'gövde kontrolü'
  | 'renk farkı'
  | 'kelime öğrenme'
  | 'yardım'
  | 'renk keşfi'
  | 'hikâye'
  | 'ses yönü'
  | 'el kavrama'
  | 'mimik eşleştirme'
  | 'ritim farkı'
  | 'nesne farkı'
  | 'ses keşfi'
  | 'taşıma'
  | 'taklit'
  | 'ritmik his'
  | 'problem çözme'
  | 'eşleştirme'
  | 'kelime bilgisi'
  | 'denge'
  | 'sıra bekleme'
  | 'ritim'
  | 'basit sıralama'
  | 'sıralama'
  | 'anlatım'
  | 'sınıflandırma'
  | 'öz ifade'
  | 'renk farkındalığı'
  | 'şekil tanıma'
  | 'ses farkındalığı'
  | 'ince motor'
  | 'sorumluluk'
  | 'hayal gücü'
  | 'örüntü'
  | 'sıralı anlatım'
  | 'duygu tanıma'
  | 'karşılaştırma'
  | 'okuma hazırlığı'
  | 'hedefleme'
  | 'şefkat'
  | 'hikâye kurma'
  | 'planlama'
  | 'yazı hazırlığı'
  | 'iş birliği'
  | 'yaratıcılık'
  | 'hafıza'
  | 'kelime üretimi'
  | 'öz düzenleme'
  | 'analiz'
  | 'uyum'
  | 'bakış paylaşımı'
  | 'gözlem'
  | 'duyusal farkındalık'
  | 'duygu tanıma'
  | 'kısa anlatım'
  | 'okuma'
  | 'sosyal beceri'
  | 'akıl yürütme'
  | 'duygu paylaşımı'
  | 'yapılandırma'
  | 'düzenleme'
  | 'sayı farkındalığı'
  | 'nezaket'
  | 'problem çözme'

export interface Activity {
  id: string
  title: string
  description: string
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
  dailyPrograms: DailyProgramRecord[]
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
