import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Question } from '@/types/quiz'

interface QuestionListProps {
  questions: Question[]
}

export function QuestionList({ questions }: QuestionListProps) {
  // Group questions by category
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = []
    }
    acc[question.category].push(question)
    return acc
  }, {} as Record<string, Question[]>)

  return (
    <div className="space-y-8">
      {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold text-primary mb-4">{category}</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {categoryQuestions.map((question) => (
              <AccordionItem
                key={question.id}
                value={question.id}
                className="border rounded-lg px-4 bg-card hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium pr-4">{question.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none pt-2
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
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  )
}
