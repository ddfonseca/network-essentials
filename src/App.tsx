import { useState, useMemo } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { MobileSidebar } from '@/components/MobileSidebar'
import { Flashcard } from '@/components/Flashcard'
import { FlashcardControls } from '@/components/FlashcardControls'
import { FlashcardNav } from '@/components/FlashcardNav'
import { StatsBar } from '@/components/StatsBar'
import { CompletionScreen } from '@/components/CompletionScreen'
import { QuestionList } from '@/components/QuestionList'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useFlashcard } from '@/hooks/useFlashcard'
import { quizTopics } from '@/data'
import type { ViewMode } from '@/types/quiz'

function App() {
  const [selectedTopicId, setSelectedTopicId] = useState('network-essentials')
  const [viewMode, setViewMode] = useState<ViewMode>('flashcard')

  const selectedTopic = useMemo(
    () => quizTopics.find(t => t.id === selectedTopicId),
    [selectedTopicId]
  )

  const questions = selectedTopic?.questions || []

  const {
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
    markKnew,
    markDidntKnow,
    goNext,
    goPrev,
    shuffle,
    reset,
    reviewMissed,
    hasIncorrectCards
  } = useFlashcard(questions)

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId)
  }

  return (
    <div className="flex min-h-screen bg-background dark">
      {/* Desktop Sidebar */}
      <Sidebar
        topics={quizTopics}
        selectedTopicId={selectedTopicId}
        onSelectTopic={handleSelectTopic}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        topics={quizTopics}
        selectedTopicId={selectedTopicId}
        onSelectTopic={handleSelectTopic}
      />

      {/* Main Content */}
      <main className="flex-1 md:ml-0">
        <div className="max-w-4xl mx-auto p-6 pt-16 md:pt-6">
          {/* Header */}
          <header className="text-center mb-8 pb-6 border-b">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              {selectedTopic?.name || 'Quiz'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {selectedTopic?.description}
            </p>
          </header>

          {/* Mode Switcher */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="mb-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
              <TabsTrigger value="list">Lista Completa</TabsTrigger>
            </TabsList>

            {/* Flashcard Mode */}
            <TabsContent value="flashcard" className="space-y-6 mt-6">
              <FlashcardControls
                totalCards={cards.length}
                onShuffle={shuffle}
                onReset={reset}
              />

              <StatsBar
                correct={correct}
                incorrect={incorrect}
                remaining={remaining}
              />

              {/* Progress */}
              <div className="text-center space-y-2">
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} / {cards.length}
                </span>
                <Progress value={progress} className="max-w-xs mx-auto" />
              </div>

              {isCompleted ? (
                <CompletionScreen
                  correct={correct}
                  incorrect={incorrect}
                  total={cards.length}
                  hasIncorrectCards={hasIncorrectCards}
                  onRestart={reset}
                  onReviewMissed={reviewMissed}
                />
              ) : (
                <>
                  <Flashcard
                    card={currentCard}
                    isAnswerVisible={isAnswerVisible}
                    onReveal={showAnswer}
                  />

                  <FlashcardNav
                    currentIndex={currentIndex}
                    totalCards={cards.length}
                    isAnswerVisible={isAnswerVisible}
                    onPrev={goPrev}
                    onNext={goNext}
                    onKnew={markKnew}
                    onDidntKnow={markDidntKnow}
                  />
                </>
              )}
            </TabsContent>

            {/* List Mode */}
            <TabsContent value="list" className="mt-6">
              <QuestionList questions={questions} />
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <footer className="text-center mt-12 pt-6 border-t text-sm text-muted-foreground">
            Quiz criado com base no conteúdo de System Design Interviews
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
