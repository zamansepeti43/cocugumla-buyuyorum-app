import { createContext } from 'react'
import type { AppData, ChildProfile, ProgressRecord, WorldId } from '../types/models'

export interface AppContextValue {
  data: AppData
  activeChild: ChildProfile | null
  completeOnboarding: () => void
  addChild: (name: string, birthDate: string) => ChildProfile
  setActiveChild: (childId: string) => void
  removeChild: (childId: string) => void
  toggleActivity: (activityId: string) => void
  resetData: () => void
  completeContent: (payload: { contentId: string; worldId: WorldId; sectionId: string; stars: number }) => void
  getContentProgress: (contentId: string) => ProgressRecord | undefined
  getSectionProgress: (sectionId: string) => ProgressRecord[]
  getWorldProgress: (worldId: string) => ProgressRecord[]
  isContentCompleted: (contentId: string) => boolean
  getTotalStars: () => number
}

export const AppContext = createContext<AppContextValue | null>(null)
