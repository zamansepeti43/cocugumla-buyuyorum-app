import { ArrowLeft, Check, Clock3, Gauge, PackageOpen, Sparkles } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { activities, categoryMeta } from '../data/activities'
import { useApp } from '../hooks/useApp'

export function ActivityDetailPage() {
  const { id } = useParams()
  const { activeChild, data, toggleActivity } = useApp()
  const activity = activities.find((item) => item.id === id)
  if (!activity) return <Navigate to="/activities" replace />

  const category = categoryMeta[activity.category]
  const completed = data.completions.some((item) => item.activityId === activity.id && item.childId === activeChild?.id)
  const ageRange = `${Math.floor(activity.ageMin / 12)}-${Math.floor(activity.ageMax / 12)} yaş`

  return (
    <div className="page detail-page">
      <Link to="/activities" className="back-link"><ArrowLeft size={18} /> Aktivitelere dön</Link>
      <section className={`detail-hero ${category.color}`}>
        <div className="detail-emoji">{category.icon}</div>
        <div><span className="kicker">{category.label}</span><h1>{activity.title}</h1><p>{activity.description}</p></div>
      </section>
      <div className="detail-facts">
        <div><Clock3 /><span>Süre<strong>{activity.duration} dakika</strong></span></div>
        <div><Gauge /><span>Yaş aralığı<strong>{ageRange}</strong></span></div>
        <div><PackageOpen /><span>Zorluk<strong>Kolay</strong></span></div>
      </div>
      <div className="detail-layout">
        <article className="detail-content">
          <section><h2>Gerekli malzemeler</h2><div className="material-list">{activity.materials.map((material) => <span key={material}>{material}</span>)}</div></section>
          <section><span className="kicker">ADIM ADIM</span><h2>Nasıl yapılır?</h2><ol className="steps">{activity.instructions.map((instruction, index) => <li key={instruction}><span>{index + 1}</span><p>{instruction}</p></li>)}</ol></section>
          <section className="parent-tip"><Sparkles /><div><h2>Ebeveyn için küçük ipucu</h2><p>{activity.parentTip}</p></div></section>
          <section><h2>Bu aktivite neyi destekler?</h2><div className="benefit-list">{activity.benefits.map((benefit) => <span key={benefit}><Check size={15} />{benefit}</span>)}</div></section>
        </article>
        <aside className="complete-panel"><div className={`complete-mark ${completed ? 'done' : ''}`}><Check /></div><h2>{completed ? 'Harika, tamamlandı!' : 'Birlikte denemeye hazır mısınız?'}</h2><p>{completed ? `${activeChild?.name} için ilerlemeye kaydedildi.` : 'Bitirdiğinizde ilerlemenize ekleyin.'}</p><button className={completed ? 'secondary-button' : 'primary-button'} onClick={() => toggleActivity(activity.id)}><Check size={19} />{completed ? 'Tamamlandı olarak işaretli' : 'Etkinliği tamamladım'}</button></aside>
      </div>
    </div>
  )
}
