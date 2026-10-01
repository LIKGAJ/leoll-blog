<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

const applyTheme = (nextTheme: Theme) => {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  localStorage.setItem('leoll-theme', nextTheme)
}

onMounted(() => {
  const saved = localStorage.getItem('leoll-theme') as Theme | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved ?? (prefersDark ? 'dark' : 'light'))
})
</script>

<template>
  <button
    class="icon-button"
    type="button"
    :aria-label="theme === 'dark' ? '切换浅色模式' : '切换深色模式'"
    :title="theme === 'dark' ? '切换浅色模式' : '切换深色模式'"
    @click="applyTheme(theme === 'dark' ? 'light' : 'dark')"
  >
    <span v-if="theme === 'dark'" aria-hidden="true">☀</span>
    <span v-else aria-hidden="true">◐</span>
  </button>
</template>
