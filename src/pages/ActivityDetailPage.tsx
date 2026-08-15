import { ArrowLeft, Check, Clock3, Gauge, PackageOpen, Sparkles } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ActivityInteractionPanel } from '../components/ActivityInteractionPanel'
import { categoryMeta } from '../data/activities'
import { allActivities } from '../data/allActivities'
import { useApp } from '../hooks/useApp'
import { calculateAge, formatAgeRange, isAgeInRange } from '../utils/age'

export function ActivityDetailPage() {
  const { id } = useParams()
  const { activeChild, data, toggleActivity } = useApp()
  const activity = allActivities.find((item) => item.id === id)
  if (!activity) return <Navigate to="/activities" replace />

  const childAge = activeChild ? calculateAge(activeChild.birthDate) : null
  const isSuitable = !childAge || isAgeInRange(childAge.totalMonths, activity.ageMin, activity.ageMax)
  if (!isSuitable) return <Navigate to="/activities" replace />

  const category = categoryMeta[activity.category]
  const completed = data.completions.some((item) => item.activityId === activity.id && item.childId === activeChild?.id)
  const ageRange = formatAgeRange(activity.ageMin, activity.ageMax)

  return (
    <div className="page detail-page">
      <Link to="/activities" className="back-link"><ArrowLeft size={18} /> Aktivitelere dön</Link>
      <section className={`detail-hero ${category.color}`}>
        <div className="detail-emoji">{category.icon}</div>
        <div><span className="kicker" style={{ color: '#fbbc33' }}>{category.label}</span><h1 style={{ color: '#f5f0eb', fontSize: '24px', fontWeight: '600' }}>{activity.title}</h1><p>{activity.description}</p></div>
      </section>
      <div className="detail-facts">
        <div><Clock3 /><span style={{ color: '#a8a79c' }}>Süre<strong>{activity.duration} dakika</strong></span></div>
        <div><Gauge /><span style={{ color: '#a8a79c' }}>Yaş aralığı<strong>{ageRange}</strong></span></div>
        <div><PackageOpen /><span style={{ color: '#a8a79c' }}>Zorluk<strong>Kolay</strong></span></div>
      </div>
      <div className="detail-layout">
        <article className="detail-content">
          <ActivityInteractionPanel activity={activity} />
          <section><h2>Gerekli malzemeler</h2><div className="material-list">{activity.materials.map((material) => <span key={material}>{material}</span>)}</div></section>
          <section><span className="kicker">ADIM ADIM</span><h2>Nasıl yapılır?</h2><ol className="steps">{activity.instructions.map((instruction, index) => <li key={instruction}><span>{index + 1}</span><p>{instruction}</p></li>)}</ol></section>
          <section className="parent-tip"><Sparkles /><div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '16px' }}><h2 style={{ color: '#fbbc33' }}>Ebeveyn için küçük ipucu</h2><p>{activity.parentTip}</p></div></section>
          <section><h2>Bu aktivite neyi destekler?</h2><div className="benefit-list">{activity.benefits.map((benefit) => <span key={benefit}><Check size={15} />{benefit}</span>)}</div></section>
        </article>
        <aside className="complete-panel"><div className={`complete-mark ${completed ? 'done' : ''}`}><Check /></div><h2>{completed ? 'Harika, tamamlandı!' : 'Birlikte denemeye hazır mısınız?'}</h2><p>{completed ? `${activeChild?.name} için ilerlemeye kaydedildi.` : 'Bitirdiğinizde ilerlemenize ekleyin.'}</p><button className={completed ? 'secondary-button' : 'primary-button'} onClick={() => toggleActivity(activity.id)}><Check size={19} />{completed ? 'Tamamlandı olarak işaretli' : 'Etkinliği tamamladım'}</button></aside>
      </div>
    </div>
  )
}
