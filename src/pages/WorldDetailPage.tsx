import { useParams, Link } from 'react-router-dom'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { SectionCard } from '../components/SectionCard'
import { ArrowLeft, Lock, Star } from 'lucide-react'
import './world-detail.css'

export function WorldDetailPage() {
  const { worldId } = useParams()
  const { getWorld, getSections, isWorldUnlocked, isSectionUnlocked } = useWorlds()
  const { getTotalStars } = useProgress()

  if (!worldId) return null

  const world = getWorld(worldId)

  if (!world) {
    return (
      <div className="page world-detail-page">
        <div className="empty-state">
          <span aria-hidden="true">🌍</span>
          <h2>Dünya bulunamadı</h2>
          <p>Bu dünya harita verilerinde kayıtlı değil.</p>
          <Link to="/worlds">Keşif Haritası'na dön</Link>
        </div>
      </div>
    )
  }

  const unlocked = isWorldUnlocked(worldId)
  const sectionsList = getSections(worldId)
  const totalStars = getTotalStars()

  return (
    <div className="page world-detail-page">
      <section
        className="world-hero"
        style={{ ['--world-color' as string]: `var(--${world.color})` }}
      >
        <Link to="/worlds" className="back-link">
          <ArrowLeft size={18} />
          Keşif Haritası
        </Link>

        <div className="world-hero-visual">
          <span className="world-hero-icon">{world.icon}</span>
          <div className="world-hero-deco" aria-hidden="true">
            <span>✨</span>
            <span>⭐</span>
            <span>✨</span>
          </div>
        </div>

        <div>
          <span className="kicker">DÜNYA</span>
          <h1>{world.title}</h1>
          <p>{world.description}</p>
        </div>

        <div className="world-hero-stats">
          <span>
            <Star size={16} />
            {totalStars} yıldız
          </span>
        </div>
      </section>

      {!unlocked && (
        <div className="locked-notice">
          <Lock size={18} />
          <div>
            <strong>Bu dünya şu anda kilitli.</strong>
            <p>İçeriği görebilir, kilitli bölümleri ilerleme koşulları karşılandığında açabilirsin.</p>
          </div>
        </div>
      )}

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="kicker">BÖLÜMLER</span>
            <h2>Bu dünyada neler öğreneceğiz?</h2>
          </div>
          <span className="section-count">{sectionsList.length} bölüm</span>
        </div>

        {sectionsList.length > 0 ? (
          <div className="sections-list">
            {sectionsList.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                unlocked={isSectionUnlocked(section.id)}
              />
            ))}
          </div>
        ) : (
          <div className="section-empty">
            <span>📚</span>
            <strong>Bu dünyaya henüz bölüm eklenmemiş.</strong>
          </div>
        )}
      </section>
    </div>
  )
}
