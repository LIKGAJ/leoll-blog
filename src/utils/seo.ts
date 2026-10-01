import { watchEffect } from 'vue'

export interface SeoOptions {
  title: string
  description: string
  /** Route path starting with "/", e.g. "/posts/docker-basic". Defaults to "/". */
  path?: string
}

const SITE_NAME = 'LEOLL Blog'
const SITE_ORIGIN = 'https://likgaj.github.io/leoll-blog'

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, attrName, attrValue] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? []
    if (attrName && attrValue) el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets document title + description/OG/canonical meta tags for the current view.
 * Reactive: re-runs whenever the reactive values read inside `getOptions` change,
 * so it works for both static views (call once) and dynamic ones like post detail
 * (pass a function that reads route/computed state).
 */
export const useSeo = (getOptions: () => SeoOptions) => {
  watchEffect(() => {
    const { title, description, path = '/' } = getOptions()
    const fullTitle = `${title} | ${SITE_NAME}`
    const url = `${SITE_ORIGIN}${path}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setLink('canonical', url)
  })
}
