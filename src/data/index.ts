import type { QuizTopic } from '@/types/quiz'
import { networkEssentialsQuestions } from './network-essentials'

export const quizTopics: QuizTopic[] = [
  {
    id: 'network-essentials',
    name: 'Network Essentials',
    icon: '🌐',
    description: 'Conceitos de networking essenciais para System Design Interviews',
    questionCount: networkEssentialsQuestions.length,
    isAvailable: true,
    questions: networkEssentialsQuestions
  },
  {
    id: 'data-modeling',
    name: 'Data Modeling',
    icon: '📊',
    description: 'Modelagem de dados e design de schemas',
    questionCount: 0,
    isAvailable: false,
    questions: []
  },
  {
    id: 'database-indexing',
    name: 'Database Indexing',
    icon: '📑',
    description: 'Índices de banco de dados e otimização de queries',
    questionCount: 0,
    isAvailable: false,
    questions: []
  },
  {
    id: 'caching',
    name: 'Caching',
    icon: '⚡',
    description: 'Estratégias de cache e invalidação',
    questionCount: 0,
    isAvailable: false,
    questions: []
  },
  {
    id: 'sharding',
    name: 'Sharding',
    icon: '🔀',
    description: 'Particionamento horizontal de dados',
    questionCount: 0,
    isAvailable: false,
    questions: []
  },
  {
    id: 'consistent-hashing',
    name: 'Consistent Hashing',
    icon: '🎯',
    description: 'Hashing consistente para sistemas distribuídos',
    questionCount: 0,
    isAvailable: false,
    questions: []
  },
  {
    id: 'cap-theorem',
    name: 'CAP Theorem',
    icon: '⚖️',
    description: 'Teorema CAP e trade-offs em sistemas distribuídos',
    questionCount: 0,
    isAvailable: false,
    questions: []
  },
  {
    id: 'numbers-to-know',
    name: 'Numbers to Know',
    icon: '🔢',
    description: 'Números importantes para estimativas de sistema',
    questionCount: 0,
    isAvailable: false,
    questions: []
  }
]

export { networkEssentialsQuestions }
