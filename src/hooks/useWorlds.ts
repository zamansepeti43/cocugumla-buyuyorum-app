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
    return worlds.find((world) => world.id === worldId)
  }

  // A world page should always be able to display its complete structure.
  // Age and star restrictions are handled by the lock state, not by hiding data.
  const getSections = (worldId: string): Section[] => {
    return sections
      .filter((section) => section.worldId === worldId)
      .sort((a, b) => a.order - b.order)
  }

  const getSection = (sectionId: string): Section | undefined => {
    return sections.find((section) => section.id === sectionId)
  }

  // Likewise, keep all content visible in a section and let isContentUnlocked
  // determine whether the child can open each item.
  const getContent = (sectionId: string): ContentItem[] => {
    return allContent
      .filter((item) => item.sectionId === sectionId)
      .sort((a, b) => a.order - b.order)
  }

  const getContentItem = (contentId: string): ContentItem | undefined => {
    return allContent.find((item) => item.id === contentId)
  }

  const isWorldUnlocked = (worldId: string): boolean => {
    const world = getWorld(worldId)
    if (!world) return false
    if (totalMonths < world.minAge || totalMonths > world.maxAge) return false
    if (!activeProgress) return true

    const worldSections = sections.filter((section) => section.worldId === worldId)
    if (worldSections.length === 0) return true

    return worldSections.some((section) => {
      if (activeProgress.unlockedSections.includes(section.id)) return true
      return (section.requiredStars ?? 0) <= totalStars
    })
  }

  const isSectionUnlocked = (sectionId: string): boolean => {
    const section = getSection(sectionId)
    if (!section) return false
    if (totalMonths < section.minAge || totalMonths > section.maxAge) return false
    if (!activeProgress) return true
    if (activeProgress.unlockedSections.includes(sectionId)) return true

    const requiredStars = section.requiredStars ?? 0
    return requiredStars <= 0 || totalStars >= requiredStars
  }

  const isContentUnlocked = (contentId: string): boolean => {
    const item = getContentItem(contentId)
    if (!item) return false
    if (totalMonths < item.minAge || totalMonths > item.maxAge) return false
    if (item.isLocked) return false

    const section = getSection(item.sectionId)
    if (!section) return true
    return isSectionUnlocked(section.id)
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
