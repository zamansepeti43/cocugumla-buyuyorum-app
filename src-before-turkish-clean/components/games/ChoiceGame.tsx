import { useGameSession } from '../../hooks/useGameSession'
import { speak, unlockAudio } from '../../utils/audio'

export type ChoiceRound = {
  prompt: string
  cue?: string
  options: Array<{
    id: string
    label: string
    emoji: string
    color?: string
  }>
  correctId: string
}

export function ChoiceGame({
  note,
  rounds,
  successMessage,
  bigCards = false,
}: {
  note: string
  rounds: ChoiceRound[]
  successMessage: string
  bigCards?: boolean
}) {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Hedefi seçin.',
    successMessage,
  })

  const currentRound = rounds[session.round % rounds.length]

  const selectOption = (optionId: string) => {
    if (session.done) return

    if (optionId === currentRound.correctId) {
      const finished = session.markCorrect()
      if (!finished) session.advanceRound()
      return
    }

    session.markWrong()
  }

  const listenCue = () => {
    if (!currentRound.cue) return
    unlockAudio()
    speak(currentRound.cue)
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">{note}</p>
      {currentRound.cue && (
        <div className="game-cue-row">
          <button type="button" className="secondary-button game-listen-btn" onClick={listenCue}>
            🔊 Sesi Dinle
          </button>
        </div>
      )}
      <div className="choice-prompt">{currentRound.prompt}</div>
      <div className={`choice-grid ${bigCards ? 'big-cards' : ''}`}>
        {currentRound.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`choice-card ${session.done && option.id === currentRound.correctId ? 'choice-correct' : ''}`}
            style={{ backgroundColor: option.color ?? '#ffffff' }}
            onClick={() => selectOption(option.id)}
          >
            <span>{option.emoji}</span>
            <strong>{option.label}</strong>
          </button>
        ))}
      </div>
      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={session.reset}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {Math.min(session.completedRounds + 1, 3)} / 3</p>
    </div>
  )
}