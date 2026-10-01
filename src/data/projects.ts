export interface Project {
  name: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'LEOLL Blog',
    description: '个人技术博客，用于记录技术学习、项目实践与开发经验。',
    tech: ['Vue 3', 'Vite', 'Markdown'],
  },
  {
    name: 'AI 同声传译 App',
    description: '一个面向实时语音翻译场景的 AI 应用项目。',
    tech: ['AI', 'Speech', 'Web', 'API'],
  },
  {
    name: 'AI 学习助手',
    description: '用于辅助学习和知识整理的 AI 项目。',
    tech: ['AI', 'Web', 'LLM'],
  },
]
