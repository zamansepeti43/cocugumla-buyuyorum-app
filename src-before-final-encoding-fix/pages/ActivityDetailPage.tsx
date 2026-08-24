import { ArrowLeft, Check, Clock3, Gauge, PackageOpen, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ActivityInteractionPanel } from '../components/ActivityInteractionPanel'
import { ActivityVisual } from '../components/ActivityVisual'
import { HowToVisual } from '../components/HowToVisual'
import { Lightbox } from '../components/Lightbox'
import { categoryMeta } from '../data/activities'
import { allActivities } from '../data/allActivities'
import { useApp } from '../hooks/useApp'
import { calculateAge, formatAgeRange, isAgeInRange } from '../utils/age'
import { childNameInitial, formatChildName } from '../utils/childName'

export function ActivityDetailPage() {
  const { id } = useParams()
  const { activeChild, data, toggleActivity } = useApp()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const activity = allActivities.find((item) => item.id === id)
  if (!activity) return <Navigate to="/activities" replace />

  const childAge = activeChild ? calculateAge(activeChild.birthDate) : null
  const isSuitable = !childAge || isAgeInRange(childAge.totalMonths, activity.ageMin, activity.ageMax)

  const category = categoryMeta[activity.category]
  const completed = data.completions.some((item) => item.activityId === activity.id && item.childId === activeChild?.id)
  const ageRange = formatAgeRange(activity.ageMin, activity.ageMax)

  return (
    <div className="page detail-page">
      <Link to="/activities" className="back-link"><ArrowLeft size={18} /> Aktivitelere dön</Link>
      {!isSuitable && (
        <div className="age-notice">
          <Sparkles size={17} />
          <span>Bu aktivite şu anki yaş aralığı için önerilmese de dilediğinizde inceleyip uyarlayabilirsiniz.</span>
        </div>
      )}
      <button type="button" className="detail-visual-button" onClick={() => setLightboxOpen(true)} aria-label={`${activity.title} görselini büyüt`}>
        <ActivityVisual activity={activity} />
        <span className="detail-visual-hint"><Maximize2Icon size={16} /> Büyütmek için tıkla</span>
      </button>
      <section className={`detail-hero ${category.color}`}>
        <div className="detail-emoji">{category.icon}</div>
        <div><span className="kicker" style={{ color: '#fbbc33' }}>{category.label}</span><h1 style={{ color: '#f5f0eb', fontSize: '24px', fontWeight: '600' }}>{activity.title}</h1><p>{activity.description}</p></div>
      </section>
      <section style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
        <span className="kicker" style={{ color: '#fbbc33' }}>BU ETKİNLİĞİN AMACI</span>
        <h2 style={{ color: '#f5f0eb', fontSize: '17px', fontWeight: '600', margin: '8px 0' }}>Bu etkinliğin amacı</h2>
        <p style={{ color: '#c9c6d0', fontSize: '14px', lineHeight: '1.6' }}>{activity.purpose ?? activity.description}</p>
      </section>
      <div className="detail-facts">
        <div><Clock3 /><span style={{ color: '#a8a79c' }}>Süre<strong>{activity.duration} dakika</strong></span></div>
        <div><Gauge /><span style={{ color: '#a8a79c' }}>Yaş aralığı<strong>{ageRange}</strong></span></div>
        <div><PackageOpen /><span style={{ color: '#a8a79c' }}>Zorluk<strong>{activity.difficulty === 'medium' ? 'Orta' : 'Kolay'}</strong></span></div>
      </div>
      <div className="detail-layout">
        <article className="detail-content">
          <section><h2>Gerekli malzemeler</h2><div className="material-list">{activity.materials.map((material) => <span key={material}>{material}</span>)}</div></section>
          <ActivityInteractionPanel activity={activity} />
          <section><span className="kicker">ADIM ADIM</span><h2>Nasıl yapılır?</h2><div className="howto-layout"><ol className="steps">{activity.instructions.map((instruction, index) => <li key={instruction}><span>{index + 1}</span><p>{instruction}</p></li>)}</ol><HowToVisual activity={activity} /></div></section>
          <section className="parent-tip"><Sparkles /><div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '16px' }}><h2 style={{ color: '#fbbc33' }}>Ebeveyn için küçük ipucu</h2><p>{activity.parentTip}</p></div></section>
          <section><h2>Bu aktivite neyi destekler?</h2><div className="benefit-list">{activity.benefits.map((benefit) => <span key={benefit}><Check size={15} />{benefit}</span>)}</div></section>
        </article>
        <aside className="complete-panel"><div className="complete-mark" style={{ background: 'linear-gradient(135deg,#f4b93f,#b45309)', color: '#241a06', fontSize: '1.6rem' }}>{childNameInitial(activeChild?.name)}</div><h2>{completed ? 'Harika, tamamlandı!' : 'Birlikte denemeye hazır mısınız?'}</h2><p>{completed ? `${formatChildName(activeChild?.name)} için ilerlemeye kaydedildi.` : 'Bitirdiğinizde ilerlemenize ekleyin.'}</p><button className={completed ? 'secondary-button' : 'primary-button'} onClick={() => toggleActivity(activity.id)}><Check size={19} />{completed ? 'Tamamlandı olarak işaretli' : 'Etkinliği tamamladım'}</button></aside>
      </div>
      <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} title={activity.title}>
        <ActivityVisual activity={activity} />
        <p className="lightbox-caption">{activity.title} — {activity.description}</p>
      </Lightbox>
    </div>
  )
}

function Maximize2Icon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  )
}
