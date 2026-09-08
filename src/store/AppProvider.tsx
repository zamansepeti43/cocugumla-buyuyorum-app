import { useEffect, useState, type ReactNode } from 'react'
import { storageService } from '../services/storageService'
import type { AppData, ChildProfile, ProgressRecord, WorldId } from '../types/models'
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
      childProgress: [
        ...current.childProgress,
        {
          childId: child.id,
          currentWorld: 'forest',
          unlockedSections: ['forest-animals-intro'],
          completedContent: [],
          totalStars: 0,
          lastPlayedAt: new Date().toISOString(),
        },
      ],
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
        progressRecords: current.progressRecords.filter((record) => record.childId !== childId),
        childProgress: current.childProgress.filter((progress) => progress.childId !== childId),
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

  function completeContent(payload: { contentId: string; worldId: WorldId; sectionId: string; stars: number }) {
    if (!activeChild) return
    const now = new Date().toISOString()
    setData((current) => {
      const existing = current.progressRecords.find(
        (record) => record.childId === activeChild.id && record.contentId === payload.contentId,
      )

      const stars = Math.max(payload.stars, existing?.stars ?? 0)
      const attempts = (existing?.attempts ?? 0) + 1
      const record: ProgressRecord = {
        childId: activeChild.id,
        worldId: payload.worldId,
        sectionId: payload.sectionId,
        contentId: payload.contentId,
        completed: true,
        completedAt: now,
        stars,
        attempts,
      }

      const progressRecords = existing
        ? current.progressRecords.map((item) => (item.contentId === payload.contentId && item.childId === activeChild.id ? record : item))
        : [...current.progressRecords, record]

      const currentChildProgress = current.childProgress.find((p) => p.childId === activeChild.id)
      const completedContent = currentChildProgress?.completedContent.includes(payload.contentId)
        ? currentChildProgress.completedContent
        : [...(currentChildProgress?.completedContent ?? []), payload.contentId]

      const totalStars = progressRecords.reduce((sum, item) => sum + item.stars, 0)

      const childProgress: typeof current.childProgress = current.childProgress.map((p) =>
        p.childId === activeChild.id
          ? {
              ...p,
              currentWorld: payload.worldId,
              unlockedSections: Array.from(
                new Set([...p.unlockedSections, payload.sectionId]),
              ),
              completedContent,
              totalStars,
              lastPlayedAt: now,
            }
          : p,
      )

      return {
        ...current,
        progressRecords,
        childProgress,
      }
    })
  }

  function getContentProgress(contentId: string): ProgressRecord | undefined {
    if (!activeChild) return undefined
    return data.progressRecords.find((record) => record.childId === activeChild.id && record.contentId === contentId)
  }

  function getSectionProgress(sectionId: string): ProgressRecord[] {
    if (!activeChild) return []
    return data.progressRecords.filter((record) => record.childId === activeChild.id && record.sectionId === sectionId)
  }

  function getWorldProgress(worldId: string): ProgressRecord[] {
    if (!activeChild) return []
    return data.progressRecords.filter((record) => record.childId === activeChild.id && record.worldId === worldId)
  }

  function isContentCompleted(contentId: string): boolean {
    if (!activeChild) return false
    return data.progressRecords.some((record) => record.childId === activeChild.id && record.contentId === contentId && record.completed)
  }

  function getTotalStars(): number {
    if (!activeChild) return 0
    return data.progressRecords
      .filter((record) => record.childId === activeChild.id)
      .reduce((sum, record) => sum + record.stars, 0)
  }

  function resetData() {
    storageService.clearData()
    setData({ hasOnboarded: false, children: [], activeChildId: null, completions: [], favorites: [], observations: [], progressRecords: [], childProgress: [] })
  }

 return (
    <AppContext.Provider value={{
      data, activeChild, completeOnboarding, addChild, setActiveChild, removeChild, toggleActivity, resetData,
      completeContent, getContentProgress, getSectionProgress, getWorldProgress, isContentCompleted, getTotalStars,
    }}>
      {children}
    </AppContext.Provider>
  )
}