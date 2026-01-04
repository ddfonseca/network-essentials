import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Question } from '@/types/quiz'

interface FlashcardProps {
  card: Question | null
  isAnswerVisible: boolean
  onReveal: () => void
}

export function Flashcard({ card, isAnswerVisible, onReveal }: FlashcardProps) {
  if (!card) {
    return (
      <Card className="min-h-[400px] flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">Nenhuma pergunta disponível</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="min-h-[400px] flex flex-col transition-all hover:border-primary/50">
      <CardHeader className="bg-primary/5 border-b">
        <span className="text-sm font-medium text-primary">
          {card.category}
        </span>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <h2 className="text-lg font-semibold leading-relaxed">
            {card.question}
          </h2>
        </div>

        {!isAnswerVisible ? (
          <Button
            onClick={onReveal}
            className="w-full rounded-none rounded-b-lg h-12"
          >
            Mostrar Resposta
          </Button>
        ) : (
          <div className="border-t bg-muted/30 p-6 max-h-[400px] overflow-y-auto">
            <div
              className="prose prose-sm dark:prose-invert max-w-none
                prose-headings:text-foreground
                prose-p:text-foreground
                prose-strong:text-primary
                prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-table:text-sm
                prose-th:bg-muted prose-th:text-primary prose-th:font-semibold
                prose-td:border-border prose-th:border-border
                prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{ __html: card.answer }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
