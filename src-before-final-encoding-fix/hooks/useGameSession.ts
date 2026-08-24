import { useCallback, useRef, useState } from 'react'

export type GameTone = 'success' | 'error' | null

export type GameSessionOptions = {
  totalRounds?: number
  initialFeedback?: string
  successMessage: string
  stepMessage?: string
  errorMessage?: string
  onComplete?: () => void
}

export type GameSession = {
  round: number
  completedRounds: number
  score: number
  wrongCount: number
  feedback: string
  tone: GameTone
  done: boolean
  markCorrect: () => boolean
  markWrong: () => void
  advanceRound: () => void
  reset: () => void
}

export function useGameSession({
  totalRounds = 3,
  initialFeedback = 'Hedefi seçin.',
  successMessage,
  stepMessage = 'Doğru! Sonraki tur hazır.',
  errorMessage = 'Yanlış seçim. Tekrar deneyin.',
  onComplete,
}: GameSessionOptions): GameSession {
  const [round, setRound] = useState(0)
  const [completedRounds, setCompletedRounds] = useState(0)
  const [score, setScore] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [feedback, setFeedback] = useState(initialFeedback)
  const [tone, setTone] = useState<GameTone>(null)
  const [done, setDone] = useState(false)
  const completedRef = useRef(false)

  const markCorrect = useCallback((): boolean => {
    if (completedRef.current) return true
    const next = completedRounds + 1
    setCompletedRounds(next)
    setScore((value) => value + 1)
    setTone('success')
    if (next >= totalRounds) {
      completedRef.current = true
      setDone(true)
      setFeedback(successMessage)
      onComplete?.()
      return true
    }
    setFeedback(stepMessage)
    return false
  }, [completedRounds, onComplete, stepMessage, successMessage, totalRounds])

  const markWrong = useCallback(() => {
    if (completedRef.current) return
    setWrongCount((value) => value + 1)
    setTone('error')
    setFeedback(errorMessage)
  }, [errorMessage])

  const advanceRound = useCallback(() => {
    setRound((value) => value + 1)
  }, [])

  const reset = useCallback(() => {
    completedRef.current = false
    setRound(0)
    setCompletedRounds(0)
    setScore(0)
    setWrongCount(0)
    setFeedback(initialFeedback)
    setTone(null)
    setDone(false)
  }, [initialFeedback])

  return {
    round,
    completedRounds,
    score,
    wrongCount,
    feedback,
    tone,
    done,
    markCorrect,
    markWrong,
    advanceRound,
    reset,
  }
}