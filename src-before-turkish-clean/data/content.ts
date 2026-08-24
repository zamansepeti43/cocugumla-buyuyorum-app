import { allActivities } from './allActivities'
import { englishLessons } from './englishLessons'
import type { ContentItem, ContentType } from '../types/models'

type RoutedActivity = (typeof allActivities)[number] & { worldId: string; sectionId: string }

function contentTypeFor(worldId: string, activityType?: string): ContentType {
  if (worldId === 'stories' || worldId === 'fairy-tales') return 'story'
  if (worldId === 'english' || worldId === 'math' || worldId === 'speech') return 'lesson'
  if (activityType === 'creative') return 'interactive'
  if (worldId === 'forest' || worldId === 'space') return 'interactive'
  return 'game'
}

export const contentItems: ContentItem[] = (allActivities as RoutedActivity[]).map((activity, index) => ({
  id: activity.id,
  sectionId: activity.sectionId,
  type: contentTypeFor(activity.worldId, activity.activityType),
  title: activity.title,
  description: activity.description,
  order: index + 1,
  interactionId: activity.interactionId,
  isLocked: false,
  minAge: activity.ageMin,
  maxAge: activity.ageMax,
  duration: activity.duration,
  parentTip: activity.parentTip,
  benefits: activity.benefits,
  materials: activity.materials,
  instructions: activity.instructions,
}))

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
