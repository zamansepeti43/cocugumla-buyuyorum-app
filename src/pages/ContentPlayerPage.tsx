import { useCallback, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Lock, Sparkles } from 'lucide-react'
import { useWorlds } from '../hooks/useWorlds'
import { useProgress } from '../hooks/useProgress'
import { GameShell, gameRenderers } from '../components/games'
import { ErrorBoundary } from '../components/games/ErrorBoundary'
import { RewardScreen } from '../components/RewardScreen'
import './content-player.css'

export function ContentPlayerPage() {
  const { contentId } = useParams()
  const { getContentItem, getSection, isContentUnlocked, getWorld } = useWorlds()
  const { markCompleted, isCompleted } = useProgress()
  const [reward, setReward] = useState({
    open: false,
    title: '',
    message: '',
    unlockedSection: undefined as string | undefined,
  })

  const item = contentId ? getContentItem(contentId) : undefined
  const section = item ? getSection(item.sectionId) : undefined
  const world = section ? getWorld(section.worldId) : undefined
  const unlocked = item ? isContentUnlocked(item.id) : false
  const GameComponent = item?.interactionId ? gameRenderers[item.interactionId] : null
  const alreadyCompleted = item ? isCompleted(item.id) : false

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
    if (!item || !section) return
    markCompleted(item.id, section.worldId, item.sectionId, 1)
    showReward()
  }, [item, section, markCompleted, showReward])

  const handleRewardContinue = useCallback(() => {
    setReward((current) => ({ ...current, open: false }))
  }, [])

  if (!item || !section || !world) {
    return (
      <div className="page content-player-page">
        <div className="empty-state">
          <span aria-hidden="true">🎮</span>
          <h2>İçerik bulunamadı</h2>
          <Link to="/worlds">Keşif Haritası'na dön</Link>
        </div>
      </div>
    )
  }

  const typeLabel =
    item.type === 'game'
      ? 'Oyun'
      : item.type === 'lesson'
        ? 'Ders'
        : item.type === 'story'
          ? 'Hikâye'
          : 'Etkileşimli'

  return (
    <div className="page content-player-page">
      <section
        className="content-player-header"
        style={{ ['--world-color' as string]: `var(--${world.color})` }}
      >
        <Link
          to={`/worlds/${world.id}/section/${section.id}`}
          className="content-player-back-link"
          aria-label="Bölüm sayfasına geri dön"
        >
          <ArrowLeft size={18} /> {section.title}
        </Link>

        <div className="content-player-header-inner">
          <span className="content-player-type">{world.icon} {world.title} · {typeLabel}</span>
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
          <Lock size={18} />
          <p>Bu içerik henüz kilitli. Önce bölümün kilidini açmalısın.</p>
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

          <div className="content-complete-bar">
            {!alreadyCompleted ? (
              <button className="primary-button complete-button" onClick={handleComplete}>
                <CheckCircle2 size={18} /> Tamamla
              </button>
            ) : (
              <div className="completed-badge">
                <CheckCircle2 size={18} /> Tamamlandı
              </div>
            )}
          </div>
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
