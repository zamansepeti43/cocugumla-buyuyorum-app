import { CheckCircle2, Flame, Trophy, Award } from 'lucide-react'
import { useApp } from '../hooks/useApp'
import { useProgress } from '../hooks/useProgress'
import { formatChildName } from '../utils/childName'
import { Link } from 'react-router-dom'

export function ProgressPage() {
  const { activeChild } = useApp()
  const { progressRecords, getTotalStars } = useProgress()
  const totalStars = getTotalStars()
  const completedCount = progressRecords.filter((r) => r.completed).length

  const recentCompletions = progressRecords
    .filter((r) => r.completed)
    .sort((a, b) => new Date(b.completedAt ?? '').getTime() - new Date(a.completedAt ?? '').getTime())
    .slice(0, 8)

  return (
    <div className="page">
      <section className="page-title"><div><span className="kicker">KEŞİF YOLCULUĞU</span><h1>{formatChildName(activeChild?.name)}’in izleri</h1><p>Her tamamlanan içerik, küçük bir başarıdır.</p></div></section>
      <div className="stat-grid">
        <div className="stat-card coral"><CheckCircle2 /><span><strong>{completedCount}</strong>Keşif</span></div>
        <div className="stat-card sun"><Flame /><span><strong>{totalStars}</strong>Yıldız</span></div>
        <div className="stat-card mint"><Trophy /><span><strong>{recentCompletions.length}</strong>Son keşif</span></div>
        <div className="stat-card sky"><Award /><span><strong>5</strong>Sıradaki hedef</span></div>
      </div>
      <div className="progress-layout">
        <section className="progress-card">
          <div className="section-heading">
            <div>
              <span className="kicker">SON İLERLEMELER</span>
              <h2>Ne keşfetti?</h2>
            </div>
          </div>
          <div className="recent-list">
            {recentCompletions.length === 0 && (
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Henüz keşif yok. İlk içeriği tamamlamaya ne dersin?</p>
            )}
            {recentCompletions.map((record) => (
              <div key={record.contentId} className="recent-item">
                <span className="recent-icon">✅</span>
                <span>{record.contentId.replace(/-/g, ' ')}</span>
                <span className="recent-stars">{'⭐'.repeat(record.stars)}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="milestone-card">
          <div className="trophy-mark"><Trophy /></div>
          <span className="kicker">SIRADAKİ HEDEF</span>
          <h2>5 keşifi tamamla</h2>
          <p>{Math.min(completedCount, 5)} / 5 keşif</p>
          <div className="goal-track"><span style={{ width: `${Math.min(100, completedCount * 20)}%` }} /></div>
          <Link to="/worlds" className="primary-button" style={{ marginTop: 16 }}>Keşif Haritası'na Git</Link>
        </section>
      </div>
      <p className="medical-note">Bu ekran yalnızca birlikte yaptığınız keşifleri gösterir; tıbbi veya gelişimsel değerlendirme sunmaz.</p>
    </div>
  )
}
