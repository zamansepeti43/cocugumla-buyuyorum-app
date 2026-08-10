import { BookOpen, Clock3, LockKeyhole, Play, Volume2 } from 'lucide-react'
import { englishLessons } from '../data/englishLessons'

export function EnglishPage() {
  return (
    <div className="page english-page">
      <section className="english-hero"><div><span className="kicker">ENGLISH CLUB</span><h1>İngilizceyi oyunla keşfet.</h1><p>Yaşa uygun kelimeler, tekrarlar ve mini oyunlar için hazırlanan öğrenme alanı.</p><span className="coming-badge">Yakında daha fazlası</span></div><div className="english-visual"><span>Hello!</span><strong>ABC</strong><i>⭐</i></div></section>
      <section className="section-block"><div className="section-heading"><div><span className="kicker">İLK KELİMELER</span><h2>Mini dersler</h2></div></div><div className="lesson-grid">{englishLessons.map((lesson, lessonIndex) => <article className="lesson-card" key={lesson.id}><div className={`lesson-cover cover-${lessonIndex + 1}`}><BookOpen /><span>{lesson.words.map((word) => word.emoji).join(' ')}</span></div><div className="lesson-body"><span className="lesson-meta"><Clock3 size={15} /> {lesson.duration} dakika</span><h3>{lesson.title}</h3><div className="word-preview">{lesson.words.map((word) => <span key={word.id}><button aria-label={`${word.word} kelimesini dinle`} disabled><Volume2 size={15} /></button><strong>{word.word}</strong><small>{word.translation}</small></span>)}</div><button className="secondary-button" disabled title="Bu özellik sonraki sürümde etkinleşecek"><Play size={17} /> Dersi keşfet</button></div></article>)}</div></section>
      <section className="future-panel"><LockKeyhole /><div><span className="kicker">YOL HARİTASINDA</span><h2>Çocuğunuza göre şekillenen bir program</h2><p>Dinleme, tekrar, mini hikâyeler, oyunlar ve basit konuşma çalışmaları sonraki sürümlerde bu alana eklenecek.</p></div></section>
    </div>
  )
}
