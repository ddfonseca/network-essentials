import { useState, useCallback, useEffect } from 'react'
import type { Question } from '@/types/quiz'

interface UseFlashcardReturn {
  currentIndex: number
  cards: Question[]
  correct: number
  incorrect: number
  remaining: number
  isAnswerVisible: boolean
  isCompleted: boolean
  currentCard: Question | null
  progress: number
  showAnswer: () => void
  hideAnswer: () => void
  markKnew: () => void
  markDidntKnow: () => void
  goNext: () => void
  goPrev: () => void
  shuffle: () => void
  reset: () => void
  reviewMissed: () => void
  hasIncorrectCards: boolean
}

export function useFlashcard(initialQuestions: Question[]): UseFlashcardReturn {
  const [cards, setCards] = useState<Question[]>(initialQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [answered, setAnswered] = useState<Set<number>>(new Set())
  const [incorrectCards, setIncorrectCards] = useState<Question[]>([])
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentCard = cards[currentIndex] || null
  const remaining = cards.length - answered.size
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0

  const showAnswer = useCallback(() => {
    setIsAnswerVisible(true)
  }, [])

  const hideAnswer = useCallback(() => {
    setIsAnswerVisible(false)
  }, [])

  const checkCompletion = useCallback(() => {
    if (answered.size === cards.length && cards.length > 0) {
      setIsCompleted(true)
    }
  }, [answered.size, cards.length])

  const goNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsAnswerVisible(false)
    } else {
      checkCompletion()
    }
  }, [currentIndex, cards.length, checkCompletion])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setIsAnswerVisible(false)
    }
  }, [currentIndex])

  const markKnew = useCallback(() => {
    if (!answered.has(currentIndex)) {
      setCorrect(prev => prev + 1)
      setAnswered(prev => new Set(prev).add(currentIndex))
    }
    goNext()
  }, [currentIndex, answered, goNext])

  const markDidntKnow = useCallback(() => {
    if (!answered.has(currentIndex)) {
      setIncorrect(prev => prev + 1)
      setAnswered(prev => new Set(prev).add(currentIndex))
      setIncorrectCards(prev => [...prev, cards[currentIndex]])
    }
    goNext()
  }, [currentIndex, answered, cards, goNext])

  const shuffle = useCallback(() => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
    setAnswered(new Set())
    setCorrect(0)
    setIncorrect(0)
    setIncorrectCards([])
    setIsAnswerVisible(false)
    setIsCompleted(false)
  }, [])

  const reset = useCallback(() => {
    setCards(initialQuestions)
    setCurrentIndex(0)
    setAnswered(new Set())
    setCorrect(0)
    setIncorrect(0)
    setIncorrectCards([])
    setIsAnswerVisible(false)
    setIsCompleted(false)
  }, [initialQuestions])

  const reviewMissed = useCallback(() => {
    if (incorrectCards.length === 0) return

    setCards(incorrectCards)
    setIncorrectCards([])
    setCurrentIndex(0)
    setAnswered(new Set())
    setCorrect(0)
    setIncorrect(0)
    setIsAnswerVisible(false)
    setIsCompleted(false)
  }, [incorrectCards])

  // Reset when questions change
  useEffect(() => {
    reset()
  }, [initialQuestions, reset])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          if (!isAnswerVisible) {
            showAnswer()
          }
          break
        case 'ArrowRight':
          goNext()
          break
        case 'ArrowLeft':
          goPrev()
          break
        case 'Digit1':
        case 'Numpad1':
          if (isAnswerVisible) {
            markKnew()
          }
          break
        case 'Digit2':
        case 'Numpad2':
          if (isAnswerVisible) {
            markDidntKnow()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAnswerVisible, isCompleted, showAnswer, goNext, goPrev, markKnew, markDidntKnow])

  return {
    currentIndex,
    cards,
    correct,
    incorrect,
    remaining,
    isAnswerVisible,
    isCompleted,
    currentCard,
    progress,
    showAnswer,
    hideAnswer,
    markKnew,
    markDidntKnow,
    goNext,
    goPrev,
    shuffle,
    reset,
    reviewMissed,
    hasIncorrectCards: incorrectCards.length > 0
  }
}
