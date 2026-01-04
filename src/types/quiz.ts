export interface Question {
  id: string
  category: string
  question: string
  answer: string
}

export interface QuizTopic {
  id: string
  name: string
  icon: string
  description: string
  questionCount: number
  isAvailable: boolean
  questions: Question[]
}

export interface QuizState {
  currentIndex: number
  cards: Question[]
  correct: number
  incorrect: number
  answered: Set<number>
  incorrectCards: Question[]
  isReviewingMissed: boolean
  isAnswerVisible: boolean
  isCompleted: boolean
}

export type ViewMode = 'flashcard' | 'list'
