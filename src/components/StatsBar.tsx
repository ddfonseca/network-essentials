import { Card, CardContent } from '@/components/ui/card'

interface StatsBarProps {
  correct: number
  incorrect: number
  remaining: number
}

export function StatsBar({ correct, incorrect, remaining }: StatsBarProps) {
  return (
    <Card>
      <CardContent className="flex justify-center gap-8 py-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{correct}</div>
          <div className="text-xs text-muted-foreground">Acertei</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">{incorrect}</div>
          <div className="text-xs text-muted-foreground">Revisar</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{remaining}</div>
          <div className="text-xs text-muted-foreground">Restantes</div>
        </div>
      </CardContent>
    </Card>
  )
}
