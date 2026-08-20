import { allActivities } from './allActivities'
import { englishLessons } from './englishLessons'
import type { ContentItem, ContentType } from '../types/models'
import { sections } from './sections'

function pickSection(worldId: string): string {
  const candidates = sections.filter((section) => section.worldId === worldId)
  return candidates[0]?.id ?? sections[0]?.id ?? 'forest-animals-intro'
}

function inferWorldAndSection(activity: {
  category: string
  activityType?: string
  interactionId?: string
  title: string
  description: string
}): { worldId: string; sectionId: string; contentType: ContentType } {
  const text = `${activity.title} ${activity.description}`.toLowerCase()
  const hasGame = !!activity.interactionId
  const isEnglish = activity.category === 'language' && text.includes('english')
  const isMath = activity.category === 'cognitive' && /sayı|numara|şekil|renk|örüntü|sıra|topla/.test(text)
  const isSpeech = activity.category === 'language' && /kelime|konuş|ses|dinle|anlat/.test(text)
  const isStory = activity.category === 'language' && /hikâye|hikaye|masal/.test(text)
  const isAnimal = /hayvan|kedi|köpek|kuş|fil|ayı|tavşan|ördek|kuş/.test(text)
  const isNature = /doğa|yaprak|çiçek|orman/.test(text)

  if (isEnglish) {
    return { worldId: 'english', sectionId: pickSection('english'), contentType: 'lesson' }
  }
  if (isMath) {
    return { worldId: 'math', sectionId: pickSection('math'), contentType: 'lesson' }
  }
  if (isSpeech) {
    return { worldId: 'speech', sectionId: pickSection('speech'), contentType: 'lesson' }
  }
  if (isStory) {
    return { worldId: 'stories', sectionId: pickSection('stories'), contentType: 'story' }
  }
  if (isAnimal || isNature) {
    return { worldId: 'forest', sectionId: pickSection('forest'), contentType: 'interactive' }
  }
  if (hasGame) {
    return { worldId: 'games', sectionId: pickSection('games'), contentType: 'game' }
  }
  if (activity.activityType === 'creative') {
    return { worldId: 'forest', sectionId: pickSection('forest'), contentType: 'interactive' }
  }
  if (activity.category === 'motor') {
    return { worldId: 'forest', sectionId: pickSection('forest'), contentType: 'interactive' }
  }
  if (activity.category === 'social') {
    return { worldId: 'stories', sectionId: pickSection('stories'), contentType: 'story' }
  }
  return { worldId: 'games', sectionId: pickSection('games'), contentType: 'game' }
}

export const contentItems: ContentItem[] = allActivities.map((activity) => {
  const { sectionId, contentType } = inferWorldAndSection(activity)
  return {
    id: activity.id,
    sectionId,
    type: contentType,
    title: activity.title,
    description: activity.description,
    order: parseInt(activity.id.split('-').pop() ?? '0', 10),
    interactionId: activity.interactionId,
    isLocked: false,
    minAge: activity.ageMin,
    maxAge: activity.ageMax,
    duration: activity.duration,
    parentTip: activity.parentTip,
    benefits: activity.benefits,
    materials: activity.materials,
    instructions: activity.instructions,
  }
})

export function buildEnglishContent(): ContentItem[] {
  return englishLessons.flatMap((lesson) =>
    lesson.words.map((word, index) => ({
      id: `${lesson.id}-${word.id}`,
      sectionId: 'english-animals',
      type: 'lesson' as ContentType,
      title: word.word,
      description: `${word.word} - ${word.translation}`,
      order: lesson.words.length * englishLessons.indexOf(lesson) + index,
      isLocked: false,
      minAge: lesson.ageMin,
      maxAge: lesson.ageMax,
      duration: lesson.duration,
    })),
  )
}

export const allContent: ContentItem[] = [...contentItems, ...buildEnglishContent()]
