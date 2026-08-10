import { useEffect, useState, type ReactNode } from 'react'
import { storageService } from '../services/storageService'
import type { AppData, ChildProfile } from '../types/models'
import { AppContext } from './app-context'

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => storageService.getData())

  useEffect(() => {
    storageService.saveData(data)
  }, [data])

  const activeChild = data.children.find((child) => child.id === data.activeChildId) ?? null

  function completeOnboarding() {
    setData((current) => ({ ...current, hasOnboarded: true }))
  }

  function addChild(name: string, birthDate: string): ChildProfile {
    const child: ChildProfile = {
      id: crypto.randomUUID(),
      name: name.trim(),
      birthDate,
      createdAt: new Date().toISOString(),
    }
    setData((current) => ({
      ...current,
      hasOnboarded: true,
      children: [...current.children, child],
      activeChildId: child.id,
    }))
    return child
  }

  function setActiveChild(childId: string) {
    setData((current) => ({ ...current, activeChildId: childId }))
  }

  function removeChild(childId: string) {
    setData((current) => {
      const children = current.children.filter((child) => child.id !== childId)
      return {
        ...current,
        children,
        activeChildId: current.activeChildId === childId ? children[0]?.id ?? null : current.activeChildId,
        completions: current.completions.filter((completion) => completion.childId !== childId),
      }
    })
  }

  function toggleActivity(activityId: string) {
    if (!activeChild) return
    setData((current) => {
      const exists = current.completions.some(
        (completion) => completion.activityId === activityId && completion.childId === activeChild.id,
      )
      return {
        ...current,
        completions: exists
          ? current.completions.filter(
              (completion) => !(completion.activityId === activityId && completion.childId === activeChild.id),
            )
          : [...current.completions, { activityId, childId: activeChild.id, completedAt: new Date().toISOString() }],
      }
    })
  }

  function resetData() {
    storageService.clearData()
    setData({ hasOnboarded: false, children: [], activeChildId: null, completions: [] })
  }

  return (
    <AppContext.Provider value={{
      data, activeChild, completeOnboarding, addChild, setActiveChild, removeChild, toggleActivity, resetData,
    }}>
      {children}
    </AppContext.Provider>
  )
}
