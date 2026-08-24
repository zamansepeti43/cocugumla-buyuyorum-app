import { Link } from 'react-router-dom'
import type { ContentItem } from '../types/models'
import { gameTitles } from '../components/games'
import { Play } from 'lucide-react'

export function ContentCard({ item, unlocked = true }: { item: ContentItem; unlocked?: boolean }) {
  const gameTitle = item.interactionId ? gameTitles[item.interactionId] : undefined
  const displayTitle = gameTitle ?? item.title

  return (
    <Link
      to={unlocked ? `/worlds/content/${item.id}` : '#'}
      className={`content-card ${unlocked ? '' : 'locked'}`}
    >
      <div className="content-card-icon">
        {item.type === 'game' && '🎮'}
        {item.type === 'lesson' && '📚'}
        {item.type === 'story' && '📖'}
        {item.type === 'interactive' && '✨'}
      </div>
      <div className="content-card-body">
        <h3>{displayTitle}</h3>
        <p>{item.description}</p>
        <span className="content-card-meta">{item.duration} dk</span>
      </div>
      {unlocked && <Play size={18} className="content-card-play" />}
      {!unlocked && <div className="content-card-lock">🔒</div>}
    </Link>
  )
}
