import { useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

type ShapePuzzlePiece = { id: string; label: string; emoji: string; slotId: string }

const PUZZLES: ShapePuzzlePiece[] = [
  { id: 'circle', label: 'Daire', emoji: '⚪', slotId: 'slot-circle' },
  { id: 'square', label: 'Kare', emoji: '🟦', slotId: 'slot-square' },
  { id: 'triangle', label: 'Üçgen', emoji: '🔺', slotId: 'slot-triangle' },
]

const SLOTS = [
  { id: 'slot-circle', label: 'Daire yuvası', outline: '●' },
  { id: 'slot-square', label: 'Kare yuvası', outline: '■' },
  { id: 'slot-triangle', label: 'Üçgen yuvası', outline: '▲' },
]

export function ShapePuzzleGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Bir parçaya dokun, sonra doğru yuvaya yerleştir.',
    successMessage: 'Harika! Bütün şekiller yerine oturdu.',
  })

  const [placed, setPlaced] = useState<Record<string, string>>({})
  const [selectedPiece, setSelectedPiece] = useState<ShapePuzzlePiece | null>(null)

  const currentPiece = PUZZLES[session.round % PUZZLES.length]

  const pickPiece = (piece: ShapePuzzlePiece) => {
    if (session.done) return
    setSelectedPiece(piece)
  }

  const placeInto = (slotId: string) => {
    if (session.done || !selectedPiece) return

    if (selectedPiece.slotId === slotId) {
      setPlaced((current) => ({ ...current, [selectedPiece.id]: slotId }))
      setSelectedPiece(null)
      const finished = session.markCorrect()
      if (!finished) session.advanceRound()
      return
    }

    session.markWrong()
    setSelectedPiece(null)
  }

  const resetGame = () => {
    setPlaced({})
    setSelectedPiece(null)
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Şekle dokun, sonra doğru şekil yuvasına yerleştir.</p>

      <div className="puzzle-tray">
        {PUZZLES.map((piece) => {
          const isPlaced = Boolean(placed[piece.id])
          return (
            <button
              key={piece.id}
              type="button"
              className={`puzzle-piece ${selectedPiece?.id === piece.id ? 'puzzle-selected' : ''} ${isPlaced ? 'puzzle-placed' : ''}`}
              onClick={() => pickPiece(piece)}
              disabled={session.done || isPlaced}
            >
              <span>{isPlaced ? '✅' : piece.emoji}</span>
              <strong>{piece.label}</strong>
            </button>
          )
        })}
      </div>

      <div className="puzzle-slots">
        {SLOTS.map((slot) => {
          const placedPiece = Object.entries(placed).find(([, slotId]) => slotId === slot.id)?.[0]
          const piece = placedPiece ? PUZZLES.find((item) => item.id === placedPiece) : null
          return (
            <button
              key={slot.id}
              type="button"
              className={`puzzle-slot ${currentPiece.slotId === slot.id && !session.done ? 'puzzle-target' : ''}`}
              onClick={() => placeInto(slot.id)}
              disabled={session.done}
            >
              <span>{piece?.emoji ?? slot.outline}</span>
              <strong>{slot.label}</strong>
            </button>
          )
        })}
      </div>

      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Tur {Math.min(session.completedRounds + 1, 3)} / 3</p>
    </div>
  )
}