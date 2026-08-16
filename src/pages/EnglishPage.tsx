import { BookOpen, Clock3, LockKeyhole, PawPrint, Play, Volume2 } from 'lucide-react'
import { englishLessons } from '../data/englishLessons'
import { findRealSoundByKey, playRealSound, speak, speakSequence, unlockAudio } from '../utils/audio'

/**
 * İngilizce kelimenin yanında çalınabilecek GERÇEK ses varsa onun anahtarını
 * döner. Hayvan/araç adları için gerçek ses dosyası (ör. kedi miyavlaması)
 * İngilizce kelime telaffuzundan AYRI çalınır; kelime telaffuzu TTS'tir,
 * hayvan sesi ise gerçek kayıttır.
 */
const WORD_SOUND_KEYS: Record<string, string> = {
  cat: 'cat',
  dog: 'dog',
  bird: 'bird',
  'green-frog': 'frog',
  'brown-bear': 'bear',
  'black-cat': 'cat',
  'white-rabbit': 'rabbit',
  car: 'car',
  'find-cat': 'cat',
  'i-see-a-dog': 'dog',
}

function playWord(word: { word: string; translation: string }) {
  unlockAudio()
  speakSequence([
    { text: word.word, lang: 'en-US', rate: 0.85 },
    { text: word.translation, lang: 'tr-TR', rate: 0.92 },
  ])
}

function playWordWithSound(word: { word: string; translation: string; id: string }) {
  unlockAudio()
  const soundKey = WORD_SOUND_KEYS[word.id]
  const descriptor = findRealSoundByKey(soundKey ?? '')
  if (descriptor) {
    // Kelime telaffuzundan (EN → TR) sonra, AYRI bir ses olarak gerçek
    // hayvan kaydı çalınır. speak() kuyruğu iptal eder; onEnd zincirleme
    // sayesinde önce kelime, ardından gerçek ses çalar.
    speak(word.word, { lang: 'en-US', rate: 0.85, onEnd: () =>
      speak(word.translation, { lang: 'tr-TR', rate: 0.92, onEnd: () =>
        void playRealSound(descriptor)
      })
    })
    return
  }
  playWord(word)
}

function playLesson(lesson: { words: Array<{ word: string; translation: string }> }) {
  unlockAudio()
  const items: Array<{ text: string; lang?: string; rate?: number }> = []
  lesson.words.forEach((word) => {
    items.push({ text: word.word, lang: 'en-US', rate: 0.85 })
    items.push({ text: word.translation, lang: 'tr-TR', rate: 0.92 })
  })
  speakSequence(items)
}

export function EnglishPage() {
  return (
    <div className="page english-page">
      <section className="english-hero"><div><span className="kicker">ENGLISH CLUB</span><h1>İngilizceyi oyunla keşfet.</h1><p>Yaşa uygun kelimeler, tekrarlar ve mini oyunlar için hazırlanan öğrenme alanı.</p><span className="coming-badge">Yakında daha fazlası</span></div><div className="english-visual"><span>Hello!</span><strong>ABC</strong><i>⭐</i></div></section>
      <section className="section-block"><div className="section-heading"><div><span className="kicker">İLK KELİMELER</span><h2>Mini dersler</h2></div></div><div className="lesson-grid">{englishLessons.map((lesson, lessonIndex) => <article className="lesson-card" key={lesson.id}><div className={`lesson-cover cover-${lessonIndex + 1}`}><BookOpen /><span>{lesson.words.map((word) => word.emoji).join(' ')}</span></div><div className="lesson-body"><span className="lesson-meta"><Clock3 size={15} /> {lesson.duration} dakika</span><h3>{lesson.title}</h3><div className="word-preview">{lesson.words.map((word) => <span key={word.id} className="word-preview-item"><span className="word-buttons"><button aria-label={`${word.word} kelimesini dinle`} className="word-listen-btn" onClick={() => playWord(word)}><Volume2 size={15} /></button>{WORD_SOUND_KEYS[word.id] ? <button aria-label={`${word.translation} gerçek sesi`} className="word-sound-btn" onClick={() => playWordWithSound(word)}><PawPrint size={15} /></button> : null}</span><strong>{word.word}</strong><small>{word.translation}</small><em className="word-emoji">{word.emoji}</em></span>)}</div><button className="secondary-button" onClick={() => playLesson(lesson)}><Play size={17} /> Kelimeleri dinle</button></div></article>)}</div></section>
      <section className="future-panel"><LockKeyhole /><div><span className="kicker">YOL HARİTASINDA</span><h2>Çocuğunuza göre şekillenen bir program</h2><p>Dinleme, tekrar, mini hikâyeler, oyunlar ve basit konuşma çalışmaları sonraki sürümlerde bu alana eklenecek.</p></div></section>
    </div>
  )
}