import { useApp } from '../hooks/useApp'
import { useProgress } from '../hooks/useProgress'
import { formatChildName } from '../utils/childName'
import { calculateAge } from '../utils/age'
import { Link } from 'react-router-dom'

export function ParentPage() {
  const { activeChild } = useApp()
  const { progressRecords } = useProgress()

  if (!activeChild) return null

  const age = calculateAge(activeChild.birthDate)
  const completedCount = progressRecords.filter((r) => r.completed).length
  const totalStars = progressRecords.reduce((sum, r) => sum + r.stars, 0)

  const domains = [
    { title: 'İngilizce', icon: '🇬🇧', path: '/english', count: progressRecords.filter(r => r.worldId === 'english' && r.completed).length },
    { title: 'Matematik', icon: '🔢', path: '/worlds', count: progressRecords.filter(r => r.worldId === 'math' && r.completed).length },
    { title: 'Konuşma', icon: '🗣️', path: '/worlds', count: progressRecords.filter(r => r.worldId === 'speech' && r.completed).length },
    { title: 'Oyunlar', icon: '🎮', path: '/worlds', count: progressRecords.filter(r => r.worldId === 'games' && r.completed).length },
  ]

  return (
    <div className="page parent-page">
      <section className="page-title">
        <div>
          <span className="kicker">EBEVEYN PANELİ</span>
          <h1>{formatChildName(activeChild.name)} için özet</h1>
          <p>Yaş: {age.label} · Gelişim takibi ve yönlendirme</p>
        </div>
      </section>

      <section className="parent-stats">
        <div className="parent-stat-card">
          <span className="parent-stat-value">{completedCount}</span>
          <span className="parent-stat-label">Tamamlanan içerik</span>
        </div>
        <div className="parent-stat-card">
          <span className="parent-stat-value">{totalStars}</span>
          <span className="parent-stat-label">Toplam yıldız</span>
        </div>
        <div className="parent-stat-card">
          <span className="parent-stat-value">{age.label}</span>
          <span className="parent-stat-label">Yaş grubu</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="kicker">GELİŞİM ALANLARI</span>
            <h2>Alan bazlı ilerleme</h2>
          </div>
        </div>
        <div className="parent-domains">
          {domains.map((domain) => (
            <Link key={domain.title} to={domain.path} className="parent-domain-card">
              <span className="parent-domain-icon">{domain.icon}</span>
              <div className="parent-domain-body">
                <h3>{domain.title}</h3>
                <p>{domain.count} tamamlanan</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="kicker">BUGÜN NE YAPABİLİRİM?</span>
            <h2>Yaşa uygun öneriler</h2>
          </div>
        </div>
        <div className="parent-suggestions">
          {age.totalMonths < 24 && (
            <div className="suggestion-card">
              <h3>👶 0-2 yaş ipucu</h3>
              <p>Bebeğinizle kısa ve sakin etkileşimler kurun. Sesli taklit oyunları ve yumuşak dokunuşlar güvenli bağ kurmaya yardımcı olur.</p>
            </div>
          )}
          {age.totalMonths >= 24 && age.totalMonths < 36 && (
            <div className="suggestion-card">
              <h3>🧸 2-3 yaş ipucu</h3>
              <p>Basit şekil ve renk oyunlarıyla başlayın. "Büyük-küçük" karşılaştırmaları ve tekrarlayan hikâyeler dil gelişimini destekler.</p>
            </div>
          )}
          {age.totalMonths >= 36 && age.totalMonths < 60 && (
            <div className="suggestion-card">
              <h3>🎨 3-5 yaş ipucu</h3>
              <p>Sayıları günlük hayatta sayın, basit örüntüler kurun ve küçük görevler vererek öz düzenlemeyi teşvik edin.</p>
            </div>
          )}
          {age.totalMonths >= 60 && (
            <div className="suggestion-card">
              <h3>🚀 5+ yaş ipucu</h3>
              <p>Daha karmaşık bulmacalar, planlama oyunları ve basit toplama çalışmalarıyla mantık yürütme becerisini güçlendirin.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
