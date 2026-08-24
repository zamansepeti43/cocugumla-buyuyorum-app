import { Link } from 'react-router-dom'
import type { World } from '../types/models'

const worldGradients: Record<string, { bg: string; accent: string }> = {
  mint: { bg: 'linear-gradient(135deg, #2a5a45 0%, #1a3a2a 100%)', accent: '#58b39a' },
  lilac: { bg: 'linear-gradient(135deg, #3d2a5a 0%, #1a1530 100%)', accent: '#a28fd0' },
  sky: { bg: 'linear-gradient(135deg, #1c3d5a 0%, #0f1f2e 100%)', accent: '#6ba9c4' },
  sun: { bg: 'linear-gradient(135deg, #5a4a2a 0%, #2e2a1f 100%)', accent: '#f4b93f' },
  coral: { bg: 'linear-gradient(135deg, #5a2a2a 0%, #2e1f1f 100%)', accent: '#f28b6f' },
}

const worldVisuals: Record<string, { emoji: string; label: string }> = {
  forest: { emoji: '🌳', label: 'Hayvanlar, doğa ve sesler' },
  space: { emoji: '🚀', label: 'Gezegenler, yıldızlar ve keşif' },
  english: { emoji: '🌍', label: 'Kelime, ses ve konuşma' },
  math: { emoji: '🔢', label: 'Sayılar, şekiller ve mantık' },
  speech: { emoji: '🗣️', label: 'Kelime ve iletişim gelişimi' },
  games: { emoji: '🎮', label: 'Eğlenceli mini oyunlar' },
  stories: { emoji: '📖', label: 'Etkileşimli hikâyeler' },
  'fairy-tales': { emoji: '🧚', label: 'Masallar ve dinleme' },
}

export function WorldCard({ world, locked = false }: { world: World; locked?: boolean }) {
  const gradient = worldGradients[world.color] || worldGradients.mint
  const visual = worldVisuals[world.id] || { emoji: world.icon, label: world.description }

  return (
    <Link
      to={locked ? '#' : `/worlds/${world.id}`}
      className={`world-card ${locked ? 'locked' : ''}`}
      style={{ ['--world-color' as string]: `var(--${world.color})`, background: gradient.bg }}
    >
      <div className="world-card-visual">
        <span className="world-card-emoji" aria-hidden="true">{visual.emoji}</span>
        {!locked && <span className="world-card-glow" aria-hidden="true" />}
      </div>
      <div className="world-card-body">
        <h3>{world.title}</h3>
        <p>{visual.label}</p>
      </div>
      {locked && <div className="world-card-lock">🔒</div>}
    </Link>
  )
}
