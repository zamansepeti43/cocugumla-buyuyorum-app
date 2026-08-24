import { Link } from 'react-router-dom'
import type { ContentItem } from '../types/models'
import { gameTitles } from '../components/games'

export function ProgressPath({ items, completedIds, activeId, lockedIds, requiredStars }: {
  items: ContentItem[]
  completedIds: Set<string>
  activeId?: string
  lockedIds: Set<string>
  requiredStars?: Map<string, number>
}) {
  if (items.length === 0) return null

  return (
    <div className="progress-path">
      {items.map((item, index) => {
        const isCompleted = completedIds.has(item.id)
        const isActive = item.id === activeId
        const isLocked = lockedIds.has(item.id)
        const starsNeeded = requiredStars?.get(item.id) ?? 0

        const gameTitle = item.interactionId ? gameTitles[item.interactionId] : undefined
        const displayTitle = gameTitle ?? item.title

        return (
          <div key={item.id} className="progress-path-item">
            <div className={`progress-path-connector ${isCompleted ? 'completed' : ''}`} />
            <div className={`progress-path-node ${isCompleted ? 'completed' : isActive ? 'active' : isLocked ? 'locked' : ''}`}>
              {isCompleted && <span className="node-icon">✓</span>}
              {isActive && <span className="node-icon">⭐</span>}
              {isLocked && <span className="node-icon">🔒</span>}
              {!isCompleted && !isActive && !isLocked && <span className="node-icon">○</span>}
            </div>
            <div className={`progress-path-content ${isLocked ? 'locked' : ''}`}>
              <Link to={isLocked ? '#' : `/worlds/content/${item.id}`} className="progress-path-link">
                <span className="progress-path-title">{displayTitle}</span>
                <span className="progress-path-meta">{item.duration} dk</span>
              </Link>
              {isLocked && starsNeeded > 0 && (
                <span className="progress-path-stars">⭐ {starsNeeded} yıldız gerekiyor</span>
              )}
            </div>
            {index < items.length - 1 && <div className={`progress-path-line ${isCompleted ? 'completed' : ''}`} />}
          </div>
        )
      })}
    </div>
  )
}
