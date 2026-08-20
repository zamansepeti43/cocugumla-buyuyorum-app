import { useParams, Link } from 'react-router-dom'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { ProgressPath } from '../components/ProgressPath'
import { ArrowLeft, Lock, Star } from 'lucide-react'
import './section.css'

export function SectionPage() {
  const { worldId, sectionId } = useParams()
  const { getWorld, getSection, getContent, isSectionUnlocked, isContentUnlocked } = useWorlds()
  const { progressRecords } = useProgress()

  if (!worldId || !sectionId) return null

  const world = getWorld(worldId)
  const section = getSection(sectionId)

  if (!world || !section || section.worldId !== world.id) {
    return (
      <div className="page section-page">
        <div className="empty-state">
          <span aria-hidden="true">📚</span>
          <h2>Bölüm bulunamadı</h2>
          <Link to={`/worlds/${worldId}`}>Dünyaya dön</Link>
        </div>
      </div>
    )
  }

  const unlocked = isSectionUnlocked(sectionId)
  const contentList = getContent(sectionId)
  const completedIds = new Set(
    progressRecords.filter((record) => record.completed).map((record) => record.contentId),
  )
  const lockedIds = new Set(
    contentList
      .filter((item) => !isContentUnlocked(item.id))
      .map((item) => item.id),
  )
  const activeId = contentList.find(
    (item) => !completedIds.has(item.id) && !lockedIds.has(item.id),
  )?.id
  const requiredStars = new Map(
    contentList.map((item) => [item.id, section.requiredStars ?? 0]),
  )

  return (
    <div className="page section-page">
      <header className="section-header">
        <Link to={`/worlds/${worldId}`} className="section-back-link" aria-label={`${world.title} dünyasına geri dön`}>
          <ArrowLeft size={20} /> {world.title}
        </Link>

        <div className="section-header-main">
          <span className="section-kicker">{world.icon} {world.title}</span>
          <h1 className="section-title">{section.title}</h1>
          <p className="section-description">{section.description}</p>
        </div>

        <div className="section-progress">
          {unlocked ? <Star size={20} className="star" /> : <Lock size={18} />}
          <span className="progress-text">
            {completedIds.size}/{contentList.length} içerik tamamlandı
          </span>
        </div>
      </header>

      {!unlocked && (
        <div className="section-locked-notice">
          <Lock size={18} />
          <span>Bu bölüm henüz kilitli. Gereken yıldız: {section.requiredStars ?? 0}</span>
        </div>
      )}

      <main>
        {contentList.length > 0 ? (
          <ProgressPath
            items={contentList}
            completedIds={completedIds}
            activeId={activeId}
            lockedIds={lockedIds}
            requiredStars={requiredStars}
          />
        ) : (
          <div className="section-empty">
            <span>🎯</span>
            <strong>Bu bölümde henüz içerik yok.</strong>
          </div>
        )}
      </main>
    </div>
  )
}
