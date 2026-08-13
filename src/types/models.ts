export const activityCategories = ['cognitive', 'language', 'motor', 'social', 'creativity'] as const

export type ActivityCategory = (typeof activityCategories)[number]
export type ActivityDifficulty = 'easy' | 'medium'
export type ActivityType = 'guided' | 'visual' | 'game' | 'quiz' | 'matching' | 'memory' | 'sorting' | 'creative'
export type ActivityInteractionId = 'contrast-track' | 'balloon-track' | 'touch-and-see' | 'sorting-game' | 'color-match-mini' | 'missing-shape' | 'animal-finder' | 'motion-track' | 'size-picker' | 'twin-match' | 'sound-object' | 'moving-shape'
export type ActivitySkill = string

export interface Activity { id:string; title:string; description:string; ageMin:number; ageMax:number; category:ActivityCategory; skill:ActivitySkill; duration:number; materials:string[]; instructions:string[]; parentTip:string; benefits:string[]; difficulty:ActivityDifficulty; safetyNotes:string[]; variations:string[]; repeatCooldownDays:number; activityType?:ActivityType; interactionId?:ActivityInteractionId; completed:boolean; isPremium:boolean }
export interface ChildProfile { id:string; name:string; birthDate:string; createdAt:string; interests:string[]; notes:string }
export interface ActivityCompletion { activityId:string; childId:string; completedAt:string }
export interface ActivityObservation { id:string; childId:string; activityId?:string; createdAt:string; mood?:'happy'|'calm'|'curious'|'tired'|'fussy'|'other'; result:'did-well'|'partly'|'not-yet'|'not-tried'; note:string }
export interface DailyProgramRecord { childId:string; date:string; activityIds:string[] }
export interface AppData { hasOnboarded:boolean; children:ChildProfile[]; activeChildId:string|null; completions:ActivityCompletion[]; dailyPrograms:DailyProgramRecord[]; favorites:string[]; observations:ActivityObservation[] }
export interface EnglishWord { id:string; word:string; translation:string; emoji:string; audioUrl?:string }
export type EnglishCategory = 'animals'|'colors'|'family'|'daily-life'
export interface EnglishLesson { id:string; title:string; category:EnglishCategory; ageMin:number; ageMax:number; duration:number; words:EnglishWord[]; isPremium:boolean }
export interface EnglishProgress { childId:string; lessonId:string; completedAt:string }
