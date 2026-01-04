import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Copy, Check } from 'lucide-react'
import { buildLLMContent, copyToClipboard } from '@/lib/copyToLLM'
import type { QuizTopic } from '@/types/quiz'

interface SidebarProps {
  topics: QuizTopic[]
  selectedTopicId: string
  onSelectTopic: (topicId: string) => void
}

export function Sidebar({ topics, selectedTopicId, onSelectTopic }: SidebarProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyToLLM = async (e: React.MouseEvent, topic: QuizTopic) => {
    e.stopPropagation()
    const content = buildLLMContent(topic)
    const success = await copyToClipboard(content)
    if (success) {
      setCopiedId(topic.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <aside className="hidden md:flex w-72 flex-col border-r bg-card">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          📚 Study Quizzes
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          System Design Interview Prep
        </p>
      </div>

      <nav className="flex-1 px-4 pb-4">
        <div className="mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
            Quizzes Disponíveis
          </span>
        </div>

        <ul className="space-y-1">
          {topics.map((topic) => (
            <li key={topic.id}>
              <div
                onClick={() => topic.isAvailable && onSelectTopic(topic.id)}
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
                {topic.isAvailable ? (
                  <button
                    onClick={(e) => handleCopyToLLM(e, topic)}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      selectedTopicId === topic.id
                        ? "hover:bg-primary-foreground/20"
                        : "hover:bg-muted"
                    )}
                    title="Copiar para LLM"
                  >
                    {copiedId === topic.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                    SOON
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <span>📖</span>
          <span>Documentação</span>
        </a>
      </div>
    </aside>
  )
}
