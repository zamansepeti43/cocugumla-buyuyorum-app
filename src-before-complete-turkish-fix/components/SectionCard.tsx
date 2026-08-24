import { Link } from 'react-router-dom'
import type { Section } from '../types/models'
import { worldMeta } from '../data/worlds'
import './section-card.css'

const sectionGradients: Record<string, string> = {
  mint: 'linear-gradient(135deg, #2a5a45 0%, #1a3a2a 100%)',
  lilac: 'linear-gradient(135deg, #3d2a5a 0%, #1a1530 100%)',
  sky: 'linear-gradient(135deg, #1c3d5a 0%, #0f1f2e 100%)',
  sun: 'linear-gradient(135deg, #5a4a2a 0%, #2e2a1f 100%)',
  coral: 'linear-gradient(135deg, #5a2a2a 0%, #2e1f1f 100%)',
}

export function SectionCard({ section, unlocked = true }: { section: Section; unlocked?: boolean }) {
  const world = worldMeta[section.worldId]
  const gradient = sectionGradients[world?.color || 'mint'] || sectionGradients.mint

  return (
    <Link
      to={unlocked ? `/worlds/${section.worldId}/section/${section.id}` : '#'}
      className={`section-card ${unlocked ? '' : 'locked'}`}
      style={{ background: gradient }}
    >
      <div className="section-card-icon">{world?.icon}</div>
      <div className="section-card-body">
        <h3>{section.title}</h3>
        <p>{section.description}</p>
      </div>
      {!unlocked && (
        <div className="section-card-lock">
          <span>🔒</span>
          <span>{section.requiredStars} yıldız</span>
        </div>
      )}
    </Link>
  )
}