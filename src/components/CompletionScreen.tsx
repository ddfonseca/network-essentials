import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CompletionScreenProps {
  correct: number
  incorrect: number
  total: number
  hasIncorrectCards: boolean
  onRestart: () => void
  onReviewMissed: () => void
}

export function CompletionScreen({
  correct,
  incorrect,
  total,
  hasIncorrectCards,
  onRestart,
  onReviewMissed
}: CompletionScreenProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <Card className="border-green-500">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-green-500">
          🎉 Parabéns! Quiz Completo!
        </CardTitle>
        <p className="text-muted-foreground">
          Você revisou todas as perguntas.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-center gap-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500">{correct}</div>
            <div className="text-sm text-muted-foreground">Acertei</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-500">{incorrect}</div>
            <div className="text-sm text-muted-foreground">Para Revisar</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{percentage}%</div>
            <div className="text-sm text-muted-foreground">Aproveitamento</div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={onRestart}>
            Revisar Novamente
          </Button>
          {hasIncorrectCards && (
            <Button variant="destructive" onClick={onReviewMissed}>
              Revisar Erradas
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
