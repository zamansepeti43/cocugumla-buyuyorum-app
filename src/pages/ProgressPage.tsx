import { Award, CalendarDays, CheckCircle2, Flame, Trophy } from 'lucide-react'
import { activities, categoryMeta } from '../data/activities'
import { useApp } from '../hooks/useApp'
import type { ActivityCategory, ActivityCompletion } from '../types/models'
import { formatChildName } from '../utils/childName'

function dateKey(value: string | Date) {
  return new Date(value).toISOString().split('T')[0]
}

function getStreak(completions: ActivityCompletion[]) {
  const dates = new Set(completions.map((item) => dateKey(item.completedAt)))
  const cursor = new Date()
  if (!dates.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (dates.has(dateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function ProgressPage() {
  const { activeChild, data } = useApp()
  const completions = data.completions.filter((item) => item.childId === activeChild?.id)
  const weekStart = new Date()
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7))
  const weekly = completions.filter((item) => new Date(item.completedAt) >= weekStart)
  const streak = getStreak(completions)
  const counts = Object.keys(categoryMeta).reduce<Record<ActivityCategory, number>>((result, category) => {
    result[category as ActivityCategory] = weekly.filter((completion) => activities.find((activity) => activity.id === completion.activityId)?.category === category).length
    return result
  }, { cognitive: 0, language: 0, motor: 0, social: 0, creativity: 0 })
  const maxCount = Math.max(1, ...Object.values(counts))

  return (
    <div className="page">
      <section className="page-title"><div><span className="kicker">KÜÇÜK ADIMLAR, GÜZEL ANILAR</span><h1>{formatChildName(activeChild?.name)}’in ilerlemesi</h1><p>Tamamladığınız her aktivite, birlikte geçirdiğiniz değerli bir an.</p></div></section>
      <div className="stat-grid">
        <div className="stat-card coral"><CheckCircle2 /><span><strong>{completions.length}</strong>Toplam aktivite</span></div>
        <div className="stat-card sun"><CalendarDays /><span><strong>{weekly.length}</strong>Bu hafta</span></div>
        <div className="stat-card mint"><Flame /><span><strong>{streak} gün</strong>Günlük seri</span></div>
        <div className="stat-card sky"><Award /><span><strong>{new Set(completions.map((item) => dateKey(item.completedAt))).size}</strong>Aktif gün</span></div>
      </div>
      <div className="progress-layout">
        <section className="progress-card"><div className="section-heading"><div><span className="kicker">BU HAFTA</span><h2>Gelişim alanları</h2></div><span className="week-total">{weekly.length} aktivite</span></div><div className="bar-chart">{Object.entries(categoryMeta).map(([key, item]) => <div className="bar-row" key={key}><span className="bar-label"><i>{item.icon}</i>{item.label}</span><div className="bar-track"><span className={item.color} style={{ width: `${(counts[key as ActivityCategory] / maxCount) * 100}%` }} /></div><strong>{counts[key as ActivityCategory]}</strong></div>)}</div></section>
        <section className="milestone-card"><div className="trophy-mark"><Trophy /></div><span className="kicker">SIRADAKİ MİNİ HEDEF</span><h2>5 aktiviteyi birlikte tamamlayın</h2><p>{Math.min(completions.length, 5)} / 5 aktivite</p><div className="goal-track"><span style={{ width: `${Math.min(100, completions.length * 20)}%` }} /></div></section>
      </div>
      <p className="medical-note">Bu ekran yalnızca birlikte yaptığınız aktiviteleri gösterir; tıbbi veya gelişimsel değerlendirme sunmaz.</p>
    </div>
  )
}
