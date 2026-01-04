import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashcardNavProps {
  currentIndex: number
  totalCards: number
  isAnswerVisible: boolean
  onPrev: () => void
  onNext: () => void
  onKnew: () => void
  onDidntKnow: () => void
}

export function FlashcardNav({
  currentIndex,
  totalCards,
  isAnswerVisible,
  onPrev,
  onNext,
  onKnew,
  onDidntKnow
}: FlashcardNavProps) {
  return (
    <div className="space-y-4">
      {isAnswerVisible && (
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onKnew}
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Sabia
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onDidntKnow}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Não Sabia
          </Button>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
        >
          Próxima
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Atalhos: <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">Espaço</kbd> revelar |{' '}
        <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">←</kbd>
        <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">→</kbd> navegar |{' '}
        <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">1</kbd> sabia |{' '}
        <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">2</kbd> não sabia
      </p>
    </div>
  )
}
