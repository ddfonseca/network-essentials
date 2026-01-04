import { Shuffle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashcardControlsProps {
  totalCards: number
  onShuffle: () => void
  onReset: () => void
}

export function FlashcardControls({ totalCards, onShuffle, onReset }: FlashcardControlsProps) {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={onShuffle}>
        <Shuffle className="h-4 w-4 mr-2" />
        Embaralhar
      </Button>
      <Button variant="outline" size="sm" onClick={onReset}>
        <RotateCcw className="h-4 w-4 mr-2" />
        Reiniciar
      </Button>
      <Button variant="outline" size="sm" disabled>
        Todas ({totalCards})
      </Button>
    </div>
  )
}
