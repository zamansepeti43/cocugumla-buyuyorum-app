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

  // All sections remain visible and accessible while the content library is being tested.
  const getSections = (worldId: string): Section[] => {
    return sections
      .filter((section) => section.worldId === worldId)
      .sort((a, b) => a.order - b.order)
  }

  const getSection = (sectionId: string): Section | undefined => {
    return sections.find((section) => section.id === sectionId)
  }

  // All content remains visible and playable during the content-preview phase.
  const getContent = (sectionId: string): ContentItem[] => {
    return allContent
      .filter((item) => item.sectionId === sectionId)
      .sort((a, b) => a.order - b.order)
  }

  const getContentItem = (contentId: string): ContentItem | undefined => {
    return allContent.find((item) => item.id === contentId)
  }

  // Temporary preview mode: do not gate worlds/sections/content by age or stars.
  const isWorldUnlocked = (worldId: string): boolean => Boolean(getWorld(worldId))
  const isSectionUnlocked = (sectionId: string): boolean => Boolean(getSection(sectionId))
  const isContentUnlocked = (contentId: string): boolean => Boolean(getContentItem(contentId))

  return {
    age,
    totalMonths,
    totalStars,
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
