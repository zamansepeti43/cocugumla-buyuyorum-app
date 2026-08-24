import type { Activity } from '../types/models'
import type { ActivityInteractionId } from '../types/models'
import { GameShell, gameRenderers, gameTitles } from './games'
import { ErrorBoundary } from './games/ErrorBoundary'
import { useEffect, useRef, useState } from 'react'

function resolveInteraction(activity: Activity): ActivityInteractionId | null {
  if (activity.interactionId) return activity.interactionId
  if (activity.activityType === 'sorting') return 'sorting-game'
  return null
}

export function ActivityInteractionPanel({ activity }: { activity: Activity }) {
  const [engineStarted, setEngineStarted] = useState(false)
  const panelIdRef = useRef<string | null>(null)
  const interaction = resolveInteraction(activity)
  const SelectedGame = interaction ? gameRenderers[interaction] : null
  const title = interaction ? (gameTitles[interaction] ?? 'Etkileşimli Oyun') : ''

  useEffect(() => {
    if (!interaction) return
    panelIdRef.current = `panel-${interaction}-${Date.now()}`
    console.debug('[ActivityInteractionPanel] Panel mounted', {
      id: panelIdRef.current,
      interaction,
      title,
      activityId: activity.id,
    })
    const timer = setTimeout(() => {
      setEngineStarted(true)
      console.debug('[ActivityInteractionPanel] Engine start triggered', {
        id: panelIdRef.current,
        interaction,
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [interaction, title, activity.id])

  const handleEngineError = (error: Error) => {
    console.error('[ActivityInteractionPanel] Engine failed to start', {
      id: panelIdRef.current,
      interaction,
      error,
    })
  }

  if (!interaction || !SelectedGame) return null

  return (
    <section className="interaction-card">
      <span className="kicker">ETKİLEŞİMLİ AKTİVİTE</span>
      <h2>Ekran Üzerinde Uygula</h2>
      <GameShell title={title}>
        {engineStarted && (
          <ErrorBoundary name={interaction} onError={handleEngineError}>
            <SelectedGame />
          </ErrorBoundary>
        )}
      </GameShell>
    </section>
  )
}