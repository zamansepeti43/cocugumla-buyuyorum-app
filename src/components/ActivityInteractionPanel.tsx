import type { Activity } from '../types/models'
import type { ActivityInteractionId } from '../types/models'
import { GameShell, gameRenderers, gameTitles } from './games'

function resolveInteraction(activity: Activity): ActivityInteractionId | null {
  if (activity.interactionId) return activity.interactionId
  if (activity.activityType === 'sorting') return 'sorting-game'
  return null
}

export function ActivityInteractionPanel({ activity }: { activity: Activity }) {
  const interaction = resolveInteraction(activity)
  if (!interaction) return null

  const SelectedGame = gameRenderers[interaction]
  if (!SelectedGame) return null

  const title = gameTitles[interaction] ?? 'Etkileşimli Oyun'

  return (
    <section className="interaction-card">
      <span className="kicker">ETKİLEŞİMLİ AKTİVİTE</span>
      <h2>Ekran Üzerinde Uygula</h2>
      <GameShell title={title}>
        <SelectedGame />
      </GameShell>
    </section>
  )
}