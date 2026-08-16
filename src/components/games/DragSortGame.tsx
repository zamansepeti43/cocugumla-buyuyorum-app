import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useGameSession } from '../../hooks/useGameSession'
import { unlockAudio, playTone } from '../../utils/audio'

type CarryItem = { id: string; label: string; emoji: string; binId: string }

const ITEMS: CarryItem[] = [
  { id: 'ball', label: 'Top', emoji: '⚽', binId: 'red' },
  { id: 'car', label: 'Araba', emoji: '🚗', binId: 'green' },
  { id: 'bear', label: 'Ayıcık', emoji: '🧸', binId: 'blue' },
]

const BINS = [
  { id: 'red', label: 'Kırmızı Kutu', emoji: '📦', color: '#e0513f' },
  { id: 'green', label: 'Yeşil Kutu', emoji: '📦', color: '#3fa55c' },
  { id: 'blue', label: 'Mavi Kutu', emoji: '📦', color: '#3f7fe0' },
]

type DragPoint = { x: number; y: number }

export function DragSortGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Öğeyi parmağınla basılı tut, sürükle ve doğru renkli kutuya bırak.',
    successMessage: 'Harika! Bütün nesneleri doğru kutulara taşıdın.',
  })

  const [dragging, setDragging] = useState<CarryItem | null>(null)
  const [dragPos, setDragPos] = useState<DragPoint | null>(null)
  const [draggedOffset, setDraggedOffset] = useState<DragPoint | null>(null)
  const [placed, setPlaced] = useState<Record<string, string>>({})
  const playgroundRef = useRef<HTMLDivElement>(null)
  const binsRef = useRef<Map<string, HTMLButtonElement>>(new Map())

  const startDrag = (item: CarryItem, event: ReactPointerEvent<HTMLButtonElement>) => {
    if (session.done || placed[item.id]) return
    unlockAudio()
    const target = event.currentTarget
    target.setPointerCapture(event.pointerId)
    const rect = target.getBoundingClientRect()
    setDraggedOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    setDragging(item)
    setDragPos({ x: event.clientX, y: event.clientY })
  }

  const moveDrag = (event: ReactPointerEvent) => {
    if (!dragging) return
    setDragPos({ x: event.clientX, y: event.clientY })
  }

  const finishDrag = (event: ReactPointerEvent) => {
    if (!dragging) return
    setDragging(null)
    setDragPos(null)
    setDraggedOffset(null)

    let targetBinId: string | null = null
    binsRef.current.forEach((bin, binId) => {
      const rect = bin.getBoundingClientRect()
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      if (inside) targetBinId = binId
    })

    if (!targetBinId) return

    if (dragging.binId === targetBinId) {
      playTone({ frequency: 660, duration: 0.2, type: 'sine', volume: 0.12 })
      setPlaced((current) => ({ ...current, [dragging.id]: targetBinId as string }))
      const allPlaced = ITEMS.every((item) => placed[item.id] || item.id === dragging.id)
      if (allPlaced) {
        session.markCorrect()
      }
      return
    }

    playTone({ frequency: 220, duration: 0.22, type: 'triangle', volume: 0.1 })
    session.markWrong()
  }

  const resetGame = () => {
    setDragging(null)
    setDragPos(null)
    setDraggedOffset(null)
    setPlaced({})
    session.reset()
  }

  const allPlaced = ITEMS.every((item) => placed[item.id])

  return (
    <div className="interactive-playground" ref={playgroundRef}>
      <p className="interactive-note">Öğeyi parmağınla basılı tut, sürükle ve doğru renkli kutuya bırak.</p>

      <div className="carry-tray">
        {ITEMS.map((item) => {
          const itemPlaced = placed[item.id]
          return (
            <button
              key={item.id}
              type="button"
              className={`carry-item ${itemPlaced ? 'carry-placed' : ''}`}
              onPointerDown={(event) => startDrag(item, event)}
              onPointerMove={moveDrag}
              onPointerUp={finishDrag}
              onPointerCancel={finishDrag}
              disabled={session.done || Boolean(itemPlaced)}
              aria-label={`${item.label} - ${item.binId === 'red' ? 'Kırmızı' : item.binId === 'green' ? 'Yeşil' : 'Mavi'} kutuya taşı`}
            >
              <span>{item.emoji}</span>
              <strong>{item.label}</strong>
            </button>
          )
        })}
      </div>

      <div className="carry-bins">
        {BINS.map((bin) => {
          const carriedInto = Object.entries(placed).find(([, binId]) => binId === bin.id)?.[0]
          const carriedItem = carriedInto ? ITEMS.find((item) => item.id === carriedInto) : null
          return (
            <button
              key={bin.id}
              type="button"
              ref={(node) => {
                if (node) binsRef.current.set(bin.id, node)
                else binsRef.current.delete(bin.id)
              }}
              className={`carry-bin ${!session.done && !allPlaced ? 'carry-bin-target' : ''}`}
              style={{ background: bin.color, borderColor: bin.color }}
              disabled={session.done}
            >
              <span>{carriedItem?.emoji ?? bin.emoji}</span>
              <strong>{bin.label}</strong>
            </button>
          )
        })}
      </div>

      {dragging && dragPos && (
        <div
          className="carry-drag-ghost"
          style={{ left: dragPos.x - (draggedOffset?.x ?? 0), top: dragPos.y - (draggedOffset?.y ?? 0) }}
          aria-hidden="true"
        >
          <span>{dragging.emoji}</span>
          <strong>{dragging.label}</strong>
        </div>
      )}

      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">{allPlaced ? 'Tamamlandı!' : ` yerleştirildi: ${Object.keys(placed).length} / ${ITEMS.length}`}</p>
    </div>
  )
}