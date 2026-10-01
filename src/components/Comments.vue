<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 由 https://giscus.app 为 LIKGAJ/leoll-blog 仓库生成，mapping 为 pathname。
const GISCUS_REPO_ID = 'R_kgDOU3LXug'
const GISCUS_CATEGORY = 'Announcements'
const GISCUS_CATEGORY_ID = 'DIC_kwDOU3LXus4DG0Dt'

const container = ref<HTMLDivElement | null>(null)

const getTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

let observer: MutationObserver | undefined

const postThemeToGiscus = () => {
  const iframe = container.value?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: getTheme() } } },
    'https://giscus.app',
  )
}

onMounted(() => {
  if (!container.value) return

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', 'LIKGAJ/leoll-blog')
  script.setAttribute('data-repo-id', GISCUS_REPO_ID)
  script.setAttribute('data-category', GISCUS_CATEGORY)
  script.setAttribute('data-category-id', GISCUS_CATEGORY_ID)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', getTheme())
  script.setAttribute('data-lang', 'zh-CN')
  container.value.appendChild(script)

  // 主题切换时把新主题同步给已经加载的 giscus iframe
  observer = new MutationObserver(postThemeToGiscus)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section class="comments container" aria-label="评论区">
    <div ref="container"></div>
  </section>
</template>
