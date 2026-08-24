import { useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const WELL_WIDTH = 4
const WELL_HEIGHT = 4

type Cell = { filled: boolean }

function makeEmptyWell(): Cell[][] {
  return Array.from({ length: WELL_HEIGHT }, () => Array.from({ length: WELL_WIDTH }, () => ({ filled: false })))
}

export function MiniTetrisGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Şekli sola/sağa kaydır ve boşluklara yerleştir. Satır doldur.',
    successMessage: 'Harika! Bütün satırları doldurdun.',
  })

  const [well, setWell] = useState<Cell[][]>(makeEmptyWell)
  const [currentShape, setCurrentShape] = useState(0)
  const [shapeColumn, setShapeColumn] = useState(1)
  const [rowsCleared, setRowsCleared] = useState(0)

  const shape = () => {
    const shapes = [
      [0, 1, 2, 3],
      [0, 1],
      [0, 2],
    ]
    return shapes[currentShape % shapes.length]
  }

  const canPlace = (col: number): boolean => {
    const cells = shape()
    return cells.every((offset) => {
      const x = col + offset
      if (x < 0 || x >= WELL_WIDTH) return false
      const row = 0
      return !well[row][x].filled
    })
  }

  const dropShape = () => {
    const cells = shape()
    let targetRow = WELL_HEIGHT - 1
    for (let row = 0; row < WELL_HEIGHT; row += 1) {
      const fits = cells.every((offset) => {
        const x = shapeColumn + offset
        return x >= 0 && x < WELL_WIDTH && !well[row][x].filled
      })
      if (fits) targetRow = row
      else break
    }

    const nextWell = well.map((row) => row.map((cell) => ({ ...cell })))
    cells.forEach((offset) => {
      const x = shapeColumn + offset
      nextWell[targetRow][x].filled = true
    })

    const fullRows = nextWell.filter((row) => row.every((cell) => cell.filled))
    const remainingRows = nextWell.filter((row) => !row.every((cell) => cell.filled))
    while (remainingRows.length < WELL_HEIGHT) {
      remainingRows.unshift(Array.from({ length: WELL_WIDTH }, () => ({ filled: false })))
    }

    setWell(remainingRows)
    const newCleared = rowsCleared + fullRows.length
    setRowsCleared(newCleared)

    if (newCleared >= 3) {
      session.markCorrect()
    } else {
      const nextShape = (currentShape + 1) % 3
      setCurrentShape(nextShape)
      setShapeColumn(1)
      if (!canPlaceFor(nextShape, 1, remainingRows)) {
        setWell(makeEmptyWell())
      }
    }
  }

  const canPlaceFor = (shapeIndex: number, col: number, grid: Cell[][]): boolean => {
    const shapes = [
      [0, 1, 2, 3],
      [0, 1],
      [0, 2],
    ]
    const cells = shapes[shapeIndex % shapes.length]
    return cells.every((offset) => {
      const x = col + offset
      return x >= 0 && x < WELL_WIDTH && !grid[0][x].filled
    })
  }

  const moveLeft = () => {
    if (session.done) return
    if (canPlace(shapeColumn - 1)) setShapeColumn((col) => col - 1)
  }

  const moveRight = () => {
    if (session.done) return
    if (canPlace(shapeColumn + 1)) setShapeColumn((col) => col + 1)
  }

  const resetGame = () => {
    setWell(makeEmptyWell())
    setCurrentShape(0)
    setShapeColumn(1)
    setRowsCleared(0)
    session.reset()
  }

  return (
    <div className="interactive-playground">
      <p className="interactive-note">Şekli yana kaydır ve aşağıya bırak. Dolu satırları temizle, 3 satır tamamla.</p>

      <div className="tetris-stage">
        <div className="tetris-well">
          {well.map((row, rowIndex) => (
            <div key={rowIndex} className="tetris-row">
              {row.map((cell, colIndex) => {
                const isShapeHere =
                  !cell.filled &&
                  rowIndex === 0 &&
                  shape().some((offset) => shapeColumn + offset === colIndex)
                return (
                  <span key={colIndex} className={`tetris-cell ${cell.filled ? 'tetris-filled' : ''} ${isShapeHere ? 'tetris-active' : ''}`} />
                )
              })}
            </div>
          ))}
        </div>
        <div className="tetris-controls">
          <button type="button" className="secondary-button" onClick={moveLeft} disabled={session.done}>◀ Sol</button>
          <button type="button" className="primary-button" onClick={dropShape} disabled={session.done}>Bırak ▼</button>
          <button type="button" className="secondary-button" onClick={moveRight} disabled={session.done}>Sağ ▶</button>
        </div>
      </div>

      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Temizlenen satır: {rowsCleared} / 3</p>
    </div>
  )
}