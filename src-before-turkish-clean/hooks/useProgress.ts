import { useMemo } from 'react'
import { useApp } from './useApp'
import type { ProgressRecord, WorldId } from '../types/models'

export function useProgress() {
  const { activeChild, data, completeContent, getContentProgress, getSectionProgress, getWorldProgress, isContentCompleted, getTotalStars } = useApp()

  const childProgress = useMemo(() => {
    if (!activeChild) return null
    return data.childProgress.find((p) => p.childId === activeChild.id) ?? null
  }, [activeChild, data.childProgress])

  const progressRecords = useMemo(() => {
    if (!activeChild) return [] as ProgressRecord[]
    return data.progressRecords.filter((record) => record.childId === activeChild.id)
  }, [activeChild, data.progressRecords])

  const getRecord = (contentId: string): ProgressRecord | undefined => {
    return getContentProgress(contentId)
  }

  const markCompleted = (contentId: string, worldId: WorldId, sectionId: string, stars = 1) => {
    if (!activeChild) return
    const existing = getContentProgress(contentId)
    if (existing && existing.completed) {
      return
    }
    completeContent({ contentId, worldId, sectionId, stars })
  }

  return {
    childProgress,
    progressRecords,
    getRecord,
    isCompleted: (contentId: string) => isContentCompleted(contentId),
    getStars: (contentId: string) => getRecord(contentId)?.stars ?? 0,
    markCompleted,
    getSectionProgress: (sectionId: string) => getSectionProgress(sectionId),
    getWorldProgress: (worldId: string) => getWorldProgress(worldId),
    getTotalStars,
  }
}
