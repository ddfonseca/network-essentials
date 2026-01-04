import { LLM_LEARNING_PROMPT } from '@/data/llm-prompt'
import type { QuizTopic } from '@/types/quiz'

function htmlToPlainText(html: string): string {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  // Replace <br> with newlines
  tempDiv.querySelectorAll('br').forEach(br => br.replaceWith('\n'))

  // Replace <p> with double newlines
  tempDiv.querySelectorAll('p').forEach(p => {
    p.insertAdjacentText('beforebegin', '\n')
    p.insertAdjacentText('afterend', '\n')
  })

  // Replace <li> with bullet points
  tempDiv.querySelectorAll('li').forEach(li => {
    li.insertAdjacentText('beforebegin', '\n• ')
  })

  // Replace <ul> and <ol> with newlines
  tempDiv.querySelectorAll('ul, ol').forEach(list => {
    list.insertAdjacentText('beforebegin', '\n')
    list.insertAdjacentText('afterend', '\n')
  })

  // Replace headings with markdown-style headings
  tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    const level = parseInt(heading.tagName[1])
    const prefix = '#'.repeat(level) + ' '
    heading.insertAdjacentText('beforebegin', '\n' + prefix)
    heading.insertAdjacentText('afterend', '\n')
  })

  // Replace <code> with backticks
  tempDiv.querySelectorAll('code').forEach(code => {
    code.insertAdjacentText('beforebegin', '`')
    code.insertAdjacentText('afterend', '`')
  })

  // Replace <pre> with code blocks
  tempDiv.querySelectorAll('pre').forEach(pre => {
    pre.insertAdjacentText('beforebegin', '\n```\n')
    pre.insertAdjacentText('afterend', '\n```\n')
  })

  // Replace <strong> and <b> with **
  tempDiv.querySelectorAll('strong, b').forEach(el => {
    el.insertAdjacentText('beforebegin', '**')
    el.insertAdjacentText('afterend', '**')
  })

  // Replace <em> and <i> with *
  tempDiv.querySelectorAll('em, i').forEach(el => {
    el.insertAdjacentText('beforebegin', '*')
    el.insertAdjacentText('afterend', '*')
  })

  // Replace <blockquote> with >
  tempDiv.querySelectorAll('blockquote').forEach(bq => {
    bq.insertAdjacentText('beforebegin', '\n> ')
    bq.insertAdjacentText('afterend', '\n')
  })

  // Get text content and clean up excessive whitespace
  let text = tempDiv.textContent || ''
  text = text.replace(/\n{3,}/g, '\n\n') // Max 2 consecutive newlines
  text = text.replace(/^\s+/gm, '') // Remove leading whitespace from lines
  text = text.trim()

  return text
}

export function buildLLMContent(topic: QuizTopic): string {
  let content = `# ${topic.icon} ${topic.name}\n\n`

  for (const q of topic.questions) {
    content += `## ${q.question}\n\n`
    content += htmlToPlainText(q.answer) + '\n\n'
  }

  content += '\n---\n\n'
  content += LLM_LEARNING_PROMPT

  return content
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    return false
  }
}
