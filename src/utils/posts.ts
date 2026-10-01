import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('git-bash', bash)
hljs.registerLanguage('java', java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('yml', yaml)
hljs.registerLanguage('json', json)

export interface PostMeta {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface Post extends PostMeta {
  slug: string
  content: string
  html: string
  readingTime: string
  toc: TocItem[]
}

const rawPosts = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')

const parseFrontMatter = (raw: string): { meta: PostMeta; content: string } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('Markdown post is missing front matter.')
  }

  const lines = match[1].split('\n')
  const meta: Partial<PostMeta> = { tags: [] }
  let currentKey = ''

  for (const line of lines) {
    const keyValue = line.match(/^(\w+):\s*(.*)$/)
    const listValue = line.match(/^\s*-\s*(.*)$/)

    if (keyValue) {
      currentKey = keyValue[1]
      const value = keyValue[2].trim().replace(/^"|"$/g, '')
      if (currentKey === 'tags') {
        meta.tags = value ? [value] : []
      } else {
        ;(meta as Record<string, string>)[currentKey] = value
      }
      continue
    }

    if (listValue && currentKey === 'tags') {
      meta.tags = [...(meta.tags ?? []), listValue[1].trim().replace(/^"|"$/g, '')]
    }
  }

  if (!meta.title || !meta.description || !meta.date || !meta.category) {
    throw new Error('Markdown front matter requires title, description, date and category.')
  }

  return {
    meta: {
      title: meta.title,
      description: meta.description,
      date: meta.date,
      category: meta.category,
      tags: meta.tags ?? [],
    },
    content: match[2],
  }
}

const renderer = new marked.Renderer()

renderer.heading = ({ tokens, depth }) => {
  const plain = tokens.map((token) => ('text' in token ? token.text : token.raw)).join('')
  const id = slugify(plain)
  return `<h${depth} id="${id}"><a class="heading-anchor" href="#${id}" aria-label="${plain}"></a>${plain}</h${depth}>`
}

renderer.code = ({ text, lang }) => {
  const language = lang?.split(/\s+/)[0] || 'text'
  const isKnown = language !== 'text' && hljs.getLanguage(language)
  const highlighted = isKnown
    ? hljs.highlight(text, { language }).value
    : hljs.highlightAuto(text).value

  return `<figure class="code-block">
    <figcaption>${language}</figcaption>
    <pre><code class="hljs language-${language}">${highlighted}</code></pre>
  </figure>`
}

marked.use({
  renderer,
  gfm: true,
  breaks: false,
})

const createToc = (markdown: string): TocItem[] =>
  markdown
    .split('\n')
    .map((line) => line.match(/^(#{1,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const text = match[2].replace(/[#*_`[\]]/g, '').trim()
      return {
        id: slugify(text),
        text,
        level: match[1].length,
      }
    })

const getReadingTime = (content: string) => {
  const words = content.replace(/```[\s\S]*?```/g, '').trim().length
  const minutes = Math.max(1, Math.ceil(words / 500))
  return `${minutes} min read`
}

export const posts: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()?.replace('.md', '') ?? ''
    const { meta, content } = parseFrontMatter(raw)

    return {
      ...meta,
      slug,
      content,
      html: marked.parse(content) as string,
      readingTime: getReadingTime(content),
      toc: createToc(content),
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const categories = ['全部', 'Linux', 'Java', 'AI', 'Docker', 'Red Hat', 'DevOps']

export const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

export const getPostBySlug = (slug: string) => posts.find((post) => post.slug === slug)

export const searchPosts = (keyword: string, source = posts) => {
  const normalized = keyword.trim().toLowerCase()
  if (!normalized) return source

  return source.filter((post) => {
    const haystack = [
      post.title,
      post.description,
      post.category,
      post.tags.join(' '),
      post.content,
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalized)
  })
}
