import { useState } from 'react'
import { useGameSession } from '../../hooks/useGameSession'

const MAZE: boolean[][] = [
  [false, false, false, false],
  [true, true, false, true],
  [false, false, false, true],
  [false, true, false, false],
]

const START = { row: 0, col: 0 }
const GOAL = { row: 3, col: 3 }

export function StrategyMazeGame() {
  const session = useGameSession({
    totalRounds: 3,
    initialFeedback: 'Engellerden kaçınarak hedefe ulaş. Her adımı planla.',
    successMessage: 'Harika! Labirentten doğru yolu buldun.',
  })

  const [position, setPosition] = useState(START)
  const [visited, setVisited] = useState<Array<{ row: number; col: number }>>([])

  const isWall = (row: number, col: number) => MAZE[row]?.[col] ?? true

  const move = (row: number, col: number) => {
    if (session.done) return
    if (row < 0 || col < 0 || row >= MAZE.length || col >= MAZE[0].length) return
    if (isWall(row, col)) {
      session.markWrong()
      return
    }

    const nextPosition = { row, col }
    setPosition(nextPosition)
    setVisited((current) => [...current, nextPosition])

    if (row === GOAL.row && col === GOAL.col) {
      session.markCorrect()
    }
  }

  const resetGame = () => {
    setPosition(START)
    setVisited([])
    session.reset()
  }

  const canMoveTo = (row: number, col: number) => !isWall(row, col)

  return (
    <div className="interactive-playground">
      <p className="interactive-note">🔴 ile başla, engellere dokunmadan 🏁 hedefine ulaş.</p>

      <div className="maze-grid">
        {MAZE.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const isStart = rowIndex === START.row && colIndex === START.col
            const isGoal = rowIndex === GOAL.row && colIndex === GOAL.col
            const isPosition = rowIndex === position.row && colIndex === position.col
            const wasVisited = visited.some((cell) => cell.row === rowIndex && cell.col === colIndex)
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                className={`maze-cell ${isWall(rowIndex, colIndex) ? 'maze-wall' : ''} ${isStart ? 'maze-start' : ''} ${isGoal ? 'maze-goal' : ''} ${isPosition ? 'maze-pos' : ''} ${wasVisited && !isPosition ? 'maze-visited' : ''}`}
                onClick={() => move(rowIndex, colIndex)}
                disabled={session.done}
              >
                <span>
                  {isPosition ? '🔴' : isGoal ? '🏁' : wasVisited ? '👣' : ''}
                </span>
              </button>
            )
          }),
        )}
      </div>

      <div className="maze-dpad">
        <button type="button" className="maze-btn" onClick={() => move(position.row - 1, position.col)} disabled={session.done || !canMoveTo(position.row - 1, position.col)}>▲</button>
        <div className="maze-dpad-row">
          <button type="button" className="maze-btn" onClick={() => move(position.row, position.col - 1)} disabled={session.done || !canMoveTo(position.row, position.col - 1)}>◀</button>
          <button type="button" className="maze-btn" onClick={() => move(position.row, position.col + 1)} disabled={session.done || !canMoveTo(position.row, position.col + 1)}>▶</button>
        </div>
        <button type="button" className="maze-btn" onClick={() => move(position.row + 1, position.col)} disabled={session.done || !canMoveTo(position.row + 1, position.col)}>▼</button>
      </div>

      <div className={`choice-feedback ${session.tone ?? 'idle'}`}>{session.feedback}</div>
      <div className="interactive-controls">
        <button type="button" className="secondary-button" onClick={resetGame}>Sıfırla</button>
      </div>
      <p className="choice-progress">Adım sayısı: {visited.length}</p>
    </div>
  )
}