import { useMemo } from 'react'
import { useApp } from './useApp'
import { worlds, worldMeta } from '../data/worlds'
import { sections, sectionMeta } from '../data/sections'
import { allContent } from '../data/content'
import { calculateAge } from '../utils/age'
import type { World, Section, ContentItem } from '../types/models'

export function useWorlds() {
  const { activeChild, data, getTotalStars } = useApp()
  const age = activeChild ? calculateAge(activeChild.birthDate) : null
  const totalMonths = age?.totalMonths ?? 0
  const totalStars = getTotalStars()

  const activeProgress = useMemo(() => {
    if (!activeChild) return null
    return data.childProgress.find((p) => p.childId === activeChild.id) ?? null
  }, [activeChild, data.childProgress])

  const availableWorlds = useMemo(() => {
    return worlds
      .filter((world) => totalMonths >= world.minAge && totalMonths <= world.maxAge)
      .sort((a, b) => a.order - b.order)
  }, [totalMonths])

  const lockedWorlds = useMemo(() => {
    return worlds
      .filter((world) => totalMonths < world.minAge || totalMonths > world.maxAge)
      .sort((a, b) => a.order - b.order)
  }, [totalMonths])

  const getWorld = (worldId: string): World | undefined => {
    return worlds.find((w) => w.id === worldId)
  }

  const getSections = (worldId: string): Section[] => {
    return sections
      .filter((section) => section.worldId === worldId && totalMonths >= section.minAge && totalMonths <= section.maxAge)
      .sort((a, b) => a.order - b.order)
  }

  const getSection = (sectionId: string): Section | undefined => {
    return sections.find((s) => s.id === sectionId)
  }

  const getContent = (sectionId: string): ContentItem[] => {
    return allContent
      .filter((item) => item.sectionId === sectionId && totalMonths >= item.minAge && totalMonths <= item.maxAge)
      .sort((a, b) => a.order - b.order)
  }

  const getContentItem = (contentId: string): ContentItem | undefined => {
    return allContent.find((item) => item.id === contentId)
  }

  const isWorldUnlocked = (worldId: string): boolean => {
    const world = worlds.find((w) => w.id === worldId)
    if (!world) return false
    if (totalMonths < world.minAge || totalMonths > world.maxAge) return false
    if (!activeProgress) return true
    return activeProgress.unlockedSections.some((sectionId) => {
      const section = sections.find((s) => s.id === sectionId)
      return section?.worldId === worldId
    })
  }

  const isSectionUnlocked = (sectionId: string): boolean => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return false
    if (totalMonths < section.minAge || totalMonths > section.maxAge) return false
    if (!activeProgress) return true
    if (activeProgress.unlockedSections.includes(sectionId)) return true
    const requiredStars = section.requiredStars ?? 0
    if (requiredStars <= 0) return true
    return totalStars >= requiredStars
  }

  const isContentUnlocked = (contentId: string): boolean => {
    const item = allContent.find((c) => c.id === contentId)
    if (!item) return false
    if (totalMonths < item.minAge || totalMonths > item.maxAge) return false
    const section = sections.find((s) => s.id === item.sectionId)
    if (!section) return true
    if (!activeProgress) return true
    if (activeProgress.unlockedSections.includes(item.sectionId)) return true
    const requiredStars = section.requiredStars ?? 0
    if (requiredStars <= 0) return true
    return totalStars >= requiredStars
  }

  return {
    age,
    totalMonths,
    activeProgress,
    availableWorlds,
    lockedWorlds,
    worldMeta,
    sectionMeta,
    getWorld,
    getSections,
    getSection,
    getContent,
    getContentItem,
    isWorldUnlocked,
    isSectionUnlocked,
    isContentUnlocked,
  }
}
