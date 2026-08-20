import { useParams, Link } from 'react-router-dom'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { SectionCard } from '../components/SectionCard'
import { ArrowLeft, Lock, Star } from 'lucide-react'
import './world-detail.css'

export function WorldDetailPage() {
  const { worldId } = useParams()
  const { getWorld, getSections, isWorldUnlocked } = useWorlds()
  const { getTotalStars } = useProgress()

  if (!worldId) return null

  const world = getWorld(worldId)

  if (!world) {
    return (
      <div className="page">
        <div className="empty-state">
          <span aria-hidden="true">🌍</span>
          <h2>Dünya bulunamadı</h2>
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
        style={{
          ['--world-color' as string]: `var(--${world.color})`,
        }}
      >
        <Link to="/worlds" className="back-link">
          <ArrowLeft size={18} />
          Keşif Haritası
        </Link>

        <div className="world-hero-visual">
          <span className="world-hero-icon">{world.icon}</span>

          <div className="world-hero-deco">
            <span aria-hidden="true">✨</span>
            <span aria-hidden="true">⭐</span>
            <span aria-hidden="true">✨</span>
          </div>
        </div>

        <div>
          <span
            className="kicker"
            style={{ color: 'var(--muted)' }}
          >
            DÜNYA
          </span>

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
          <p>Bu dünya henüz kilidi açılmadı.</p>
        </div>
      )}

      {unlocked && (
        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="kicker">BÖLÜMLER</span>
              <h2>İlerle</h2>
            </div>
          </div>

          <div className="sections-list">
            {sectionsList.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                unlocked={unlocked}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}