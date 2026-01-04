import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { QuizTopic } from '@/types/quiz'

interface MobileSidebarProps {
  topics: QuizTopic[]
  selectedTopicId: string
  onSelectTopic: (topicId: string) => void
}

export function MobileSidebar({ topics, selectedTopicId, onSelectTopic }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-left">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              📚 Study Quizzes
            </span>
            <p className="text-sm text-muted-foreground font-normal mt-1">
              System Design Interview Prep
            </p>
          </SheetTitle>
        </SheetHeader>

        <nav className="p-4">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
              Quizzes Disponíveis
            </span>
          </div>

          <ul className="space-y-1">
            {topics.map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => topic.isAvailable && onSelectTopic(topic.id)}
                  disabled={!topic.isAvailable}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    topic.isAvailable
                      ? "hover:bg-accent cursor-pointer"
                      : "opacity-50 cursor-not-allowed",
                    selectedTopicId === topic.id && "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <span className="text-lg">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{topic.name}</div>
                    <div className={cn(
                      "text-xs",
                      selectedTopicId === topic.id
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    )}>
                      {topic.isAvailable
                        ? `${topic.questionCount} perguntas`
                        : 'Em breve'
                      }
                    </div>
                  </div>
                  {!topic.isAvailable && (
                    <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                      SOON
                    </Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
