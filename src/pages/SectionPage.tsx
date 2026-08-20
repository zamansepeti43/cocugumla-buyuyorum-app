import { useParams, Link } from 'react-router-dom'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { ProgressPath } from '../components/ProgressPath'
import { ArrowLeft } from 'lucide-react'
import './section.css'

export function SectionPage() {
  const { worldId, sectionId } = useParams()
  const { getWorld, getSection, getContent, isSectionUnlocked } = useWorlds()
  const { progressRecords } = useProgress()

  if (!worldId || !sectionId) return null

  const world = getWorld(worldId)
  const section = getSection(sectionId)
  const unlocked = isSectionUnlocked(sectionId)
  const contentList = getContent(sectionId)

  if (!world || !section) {
    return (
      <div className="page">
        <div className="empty-state">
          <span aria-hidden="true">📚</span>
          <h2>Bölüm bulunamadı</h2>
          <Link to="/worlds">Keşif Haritası'na dön</Link>
        </div>
      </div>
    )
  }

  const completedIds = new Set(progressRecords.filter((r) => r.completed).map((r) => r.contentId))
  const lockedIds = new Set(contentList.filter((item) => !unlocked || item.isLocked).map((item) => item.id))
  const activeId = contentList.find((item) => !completedIds.has(item.id) && !lockedIds.has(item.id))?.id
  const requiredStars = new Map(contentList.map((item) => [item.id, section.requiredStars ?? 0]))

  return (
    <div className="section-page">
      <header className="section-header">
        <Link to={`/worlds/${worldId}`} className="section-back-link" aria-label="{world.title} Dunia ile geri dön">
          <ArrowLeft size={20} /> {world.title}
        </Link>
        <div>
          <h1 className="section-title">{section.title}</h1>
          <p className="section-description">{section.description}</p>
        </div>
        <div className="section-progress">
          <Star size={20} className="star" />
          <span className="progress-text">{completedIds.size}/{contentList.length} içerik tamamlandı</span>
        </div>
      </header>

      <main>
        <ProgressPath
          items={contentList}
          completedIds={completedIds}
          activeId={activeId}
          lockedIds={lockedIds}
          requiredStars={requiredStars}
        />
      </main>
    </div>
  )
}