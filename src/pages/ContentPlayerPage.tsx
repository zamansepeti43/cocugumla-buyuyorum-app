import { useParams, Link } from 'react-router-dom'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { GameShell } from '../components/games'
import { ErrorBoundary } from '../components/games/ErrorBoundary'
import { gameRenderers } from '../components/games'
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'
import type { WorldId } from '../types/models'
import { RewardScreen } from '../components/RewardScreen'
import { useCallback, useState } from 'react'
import './content-player.css'

export function ContentPlayerPage() {
  const { contentId } = useParams()
  const { getContentItem, isContentUnlocked, getWorld } = useWorlds()
  const { markCompleted, isCompleted } = useProgress()
  const [reward, setReward] = useState<{ open: boolean; title: string; message: string; unlockedSection?: string }>({
    open: false,
    title: '',
    message: '',
    unlockedSection: undefined,
  })

  const item = contentId ? getContentItem(contentId) : null
  const notFound = !contentId || !item
  const unlocked = item ? isContentUnlocked(item.id) : false
  const GameComponent = item?.interactionId ? gameRenderers[item.interactionId] : null
  const alreadyCompleted = item ? isCompleted(item.id) : false
  const worldId = item?.sectionId?.split('-')[0] as WorldId | undefined
  const world = item ? getWorld(worldId || '') : undefined

  const showReward = useCallback((unlockedSectionTitle?: string) => {
    if (!item) return
    setReward({
      open: true,
      title: 'Harika!',
      message: `${item.title} tamamlandı!`,
      unlockedSection: unlockedSectionTitle,
    })
  }, [item])

  const handleComplete = useCallback(() => {
    if (!item || !worldId) return
    markCompleted(item.id, worldId, item.sectionId, 1)
    showReward()
  }, [item, worldId, markCompleted, showReward])

  const handleRewardContinue = useCallback(() => {
    setReward((current) => ({ ...current, open: false }))
  }, [])

  if (notFound) {
    return (
      <div className="page">
        <div className="empty-state">
          <span aria-hidden="true">🎮</span>
          <h2>İçerik bulunamadı</h2>
          <Link to="/worlds">Keşif Haritası'na dön</Link>
        </div>
      </div>
    )
  }

  const typeLabel = item.type === 'game' ? 'Oyun' : item.type === 'lesson' ? 'Ders' : item.type === 'story' ? 'Hikâye' : 'Etkileşimli'

  return (
    <div className="content-player-page">
      <section className="content-player-header" style={{ ['--world-color' as string]: `var(--${world?.color || 'mint'})` }}>
        <Link to={`/worlds/${item.sectionId.split('-')[0]}/section/${item.sectionId}`} className="content-player-back-link" aria-label="Bölüm sayfasına geri dön">
          <ArrowLeft size={18} /> Geri
        </Link>
        <div className="content-player-header-inner">
          <span className="content-player-type">{typeLabel}</span>
          <h1 className="content-player-title">{item.title}</h1>
          <p className="content-player-description">{item.description}</p>
        </div>
        <div className="content-player-badge">
          <Sparkles size={16} className="sparkles" />
          <span className="duration">{item.duration} dk</span>
        </div>
      </section>

      {!unlocked && (
        <div className="locked-notice">
          <span>🔒</span>
          <p>Bu içerik henüz kilidi açılmadı.</p>
        </div>
      )}

      {unlocked && (
        <section className="content-player-body">
          <div className="content-player-game-wrapper">
            <GameShell title={item.title}>
              {GameComponent ? (
                <ErrorBoundary name={item.interactionId}>
                  <GameComponent />
                </ErrorBoundary>
              ) : (
                <div className="content-placeholder">
                  <div className="content-placeholder-icon">
                    {item.type === 'game' && '🎮'}
                    {item.type === 'lesson' && '📚'}
                    {item.type === 'story' && '📖'}
                    {item.type === 'interactive' && '✨'}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              )}
            </GameShell>
          </div>

          {!alreadyCompleted ? (
            <div className="content-complete-bar">
              <button className="primary-button complete-button" onClick={handleComplete}>
                <CheckCircle2 size={18} /> Tamamla
              </button>
            </div>
          ) : (
            <div className="content-complete-bar">
              <div className="completed-badge">
                <CheckCircle2 size={18} /> Tamamlandı
              </div>
            </div>
          )}
        </section>
      )}

      <RewardScreen
        open={reward.open}
        title={reward.title}
        message={reward.message}
        stars={1}
        unlockedSection={reward.unlockedSection}
        onContinue={handleRewardContinue}
      />
    </div>
  )
}