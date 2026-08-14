import { createContext } from 'react'
import type { AppData, ChildProfile } from '../types/models'

export interface AppContextValue {
  data: AppData
  activeChild: ChildProfile | null
  completeOnboarding: () => void
  addChild: (name: string, birthDate: string) => ChildProfile
  setActiveChild: (childId: string) => void
  removeChild: (childId: string) => void
  toggleActivity: (activityId: string) => void
  resetData: () => void
}

export const AppContext = createContext<AppContextValue | null>(null)