// Generates public/sitemap.xml and public/rss.xml from src/posts/*.md front matter.
// Runs as a "prebuild" npm hook (plain Node ESM, no Vite-specific APIs) so the output
// lands in public/ before `vite build` copies it into dist/.
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const postsDir = path.join(rootDir, 'src/posts')
const publicDir = path.join(rootDir, 'public')

const SITE_NAME = 'LEOLL Blog'
const SITE_ORIGIN = 'https://likgaj.github.io/leoll-blog'

const parseFrontMatter = (raw) => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) throw new Error('Markdown post is missing front matter.')

  const meta = {}
  for (const line of match[1].split('\n')) {
    const keyValue = line.match(/^(\w+):\s*(.*)$/)
    if (keyValue) {
      meta[keyValue[1]] = keyValue[2].trim().replace(/^"|"$/g, '')
    }
  }

  if (!meta.title || !meta.description || !meta.date || !meta.category) {
    throw new Error('Markdown front matter requires title, description, date and category.')
  }

  return meta
}

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const files = readdirSync(postsDir).filter((file) => file.endsWith('.md'))

const posts = files
  .map((file) => {
    const slug = file.replace(/\.md$/, '')
    const meta = parseFrontMatter(readFileSync(path.join(postsDir, file), 'utf-8'))
    return { slug, ...meta }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

mkdirSync(publicDir, { recursive: true })

// --- sitemap.xml ---
const staticRoutes = ['/', '/posts', '/projects', '/about']
const today = new Date().toISOString().slice(0, 10)

const sitemapUrls = [
  ...staticRoutes.map((route) => ({ loc: `${SITE_ORIGIN}${route}`, lastmod: today })),
  ...posts.map((post) => ({ loc: `${SITE_ORIGIN}/posts/${post.slug}`, lastmod: post.date })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map((url) => `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`

writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)

// --- rss.xml ---
const rssItems = posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_ORIGIN}/posts/${post.slug}</link>
      <guid>${SITE_ORIGIN}/posts/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_ORIGIN}/</link>
    <description>记录 Linux、Java、AI、Docker、DevOps 与项目开发实践。</description>
    <language>zh-CN</language>
${rssItems}
  </channel>
</rss>
`

writeFileSync(path.join(publicDir, 'rss.xml'), rss)

console.log(`Generated sitemap.xml (${sitemapUrls.length} urls) and rss.xml (${posts.length} posts).`)
