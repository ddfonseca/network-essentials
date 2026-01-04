# Study Quizzes - System Design Interview Prep

Quiz interativo com flashcards para estudar conceitos de System Design Interviews.

## Funcionalidades

- **Modo Flashcard**: Estude uma pergunta por vez com feedback
- **Modo Lista**: Veja todas as perguntas em formato accordion
- **Estatísticas**: Acompanhe seu progresso (acertos/erros/restantes)
- **Atalhos de teclado**: `Espaço` revelar, `←→` navegar, `1` sabia, `2` não sabia
- **Embaralhar**: Randomize a ordem das perguntas
- **Revisar erradas**: Ao final, revise apenas as que errou

## Tópicos

- 🌐 **Network Essentials** - 21 perguntas (disponível)
- 📊 Data Modeling (em breve)
- 📑 Database Indexing (em breve)
- ⚡ Caching (em breve)
- 🔀 Sharding (em breve)
- 🎯 Consistent Hashing (em breve)
- ⚖️ CAP Theorem (em breve)
- 🔢 Numbers to Know (em breve)

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Deploy no GitHub Pages

O deploy é automático via GitHub Actions quando há push na branch `main`.

### Configuração manual:

1. Crie um repositório no GitHub chamado `quiz`
2. Conecte o repositório local:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/quiz.git
   git branch -M main
   git push -u origin main
   ```
3. Vá em **Settings** > **Pages**
4. Em **Source**, selecione **GitHub Actions**

Seu quiz estará disponível em: `https://SEU_USUARIO.github.io/quiz/`

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/           # Componentes shadcn
│   ├── Sidebar.tsx
│   ├── Flashcard.tsx
│   ├── StatsBar.tsx
│   └── ...
├── data/
│   ├── index.ts      # Lista de tópicos
│   └── network-essentials.ts
├── hooks/
│   └── useFlashcard.ts
├── types/
│   └── quiz.ts
└── App.tsx
```
