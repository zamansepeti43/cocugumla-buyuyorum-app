import { ArrowRight, Flame, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActivityCard } from '../components/ActivityCard'
import { categoryMeta } from '../data/activities'
import { useApp } from '../hooks/useApp'
import { generateDailyProgram } from '../utils/dailyProgramEngine'

export function HomePage() {
  const { activeChild, data } = useApp()
  if (!activeChild) return null

  const completedIds = new Set(data.completions.filter((item) => item.childId === activeChild.id).map((item) => item.activityId))
  const dailyProgram = generateDailyProgram({
    childBirthDate: activeChild.birthDate,
    today: new Date(),
    completedActivityIds: Array.from(completedIds),
  })
  const todaysActivities = dailyProgram.activities
  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })
  const age = {
    label: new Date().getFullYear() - new Date(activeChild.birthDate).getFullYear(),
    ageGroup: activeChild.birthDate ? new Date().getFullYear() - new Date(activeChild.birthDate).getFullYear() >= 3 ? '3+' : '0-2' : 'Bilinmiyor',
  }

  return (
    <div className="page home-page">
      <section className="home-hero">
        <div>
          <span className="date-label">{today}</span>
          <h1>Günaydın, {activeChild.name}! 👋</h1>
          <p>Yaş: {age.label} ({age.ageGroup})</p>
<p>Bugün birlikte {todaysActivities.length} küçük aktivite yapabilirsiniz.</p>
        </div>
        <div className="streak-pill"><Flame size={22} /><span><strong>{completedIds.size}</strong> keşif tamamlandı</span></div>
      </section>

      <section className="daily-banner">
        <div className="daily-illustration" style={{ width: '80px', height: '80px', margin: '0 auto 24px', background: '#1e1e2f', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🌤️</div>
        <div><span className="eyebrow" style={{ color: '#7d7b8e', fontSize: '13px', marginBottom: '8px' }}><Sparkles size={15} /> Bugünün küçük fikri</span><h2 style={{ color: '#f5f0eb', fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Merakına eşlik et, cevabı birlikte arayın.</h2><p style={{ color: '#a8a79c', fontSize: '14px' }}>Bir aktiviteyi tamamlamak kadar birlikte soru sormak da değerlidir.</p></div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><span className="kicker">BUGÜN İÇİN</span><h2>Küçük keşifler</h2></div><Link to="/activities">Tümünü gör <ArrowRight size={17} /></Link></div>
        <div className="activity-grid">{todaysActivities.map((activity) => <ActivityCard key={activity.id} activity={activity} completed={completedIds.has(activity.id)} />)}</div>
      </section>

      <section className="category-strip">
        <div><span className="kicker">KEŞFET</span><h2>Gelişim alanları</h2></div>
        <div className="category-list">{Object.entries(categoryMeta).map(([key, item]) => <Link to={`/activities?category=${key}`} key={key} className={item.color}><span>{item.icon}</span>{item.label}</Link>)}</div>
      </section>
    </div>
  )
}
