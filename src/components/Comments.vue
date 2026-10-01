<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// TODO: 仓库创建并在仓库 Settings 开启 Discussions 后，去 https://giscus.app
// 选择 LIKGAJ/leoll-blog 仓库、mapping 选 pathname，生成配置后替换下面两行。
const GISCUS_REPO_ID = 'PLACEHOLDER_REPO_ID'
const GISCUS_CATEGORY = 'Comments'
const GISCUS_CATEGORY_ID = 'PLACEHOLDER_CATEGORY_ID'

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
