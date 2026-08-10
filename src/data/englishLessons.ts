import type { EnglishLesson } from '../types/models'

export const englishLessons: EnglishLesson[] = [
  {
    id: 'animals-first-friends',
    title: 'Hayvan Dostlarım',
    category: 'animals',
    ageMin: 24,
    ageMax: 72,
    duration: 8,
    isPremium: false,
    words: [
      { id: 'cat', word: 'Cat', translation: 'Kedi', emoji: '🐈' },
      { id: 'dog', word: 'Dog', translation: 'Köpek', emoji: '🐕' },
      { id: 'bird', word: 'Bird', translation: 'Kuş', emoji: '🐦' },
    ],
  },
  {
    id: 'colors-around-us',
    title: 'Etrafımdaki Renkler',
    category: 'colors',
    ageMin: 30,
    ageMax: 84,
    duration: 10,
    isPremium: false,
    words: [
      { id: 'red', word: 'Red', translation: 'Kırmızı', emoji: '🔴' },
      { id: 'blue', word: 'Blue', translation: 'Mavi', emoji: '🔵' },
      { id: 'yellow', word: 'Yellow', translation: 'Sarı', emoji: '🟡' },
    ],
  },
]
