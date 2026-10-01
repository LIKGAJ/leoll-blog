<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchPosts } from '../utils/posts'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const keyword = ref('')

const results = computed(() => searchPosts(keyword.value).slice(0, 8))

const goToPost = (slug: string) => {
  router.push(`/posts/${slug}`)
  keyword.value = ''
  emit('close')
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) keyword.value = ''
  },
)
</script>

<template>
  <div v-if="open" class="search-layer" @click.self="emit('close')">
    <section class="search-panel" role="dialog" aria-modal="true" aria-label="搜索文章">
      <div class="search-panel__top">
        <input
          v-model="keyword"
          type="search"
          placeholder="搜索标题、摘要、标签、分类或正文"
          autofocus
          @keydown.esc="emit('close')"
        />
        <button type="button" class="icon-button" aria-label="关闭搜索" @click="emit('close')">×</button>
      </div>

      <div class="search-results">
        <button
          v-for="post in results"
          :key="post.slug"
          type="button"
          class="search-result"
          @click="goToPost(post.slug)"
        >
          <strong>{{ post.title }}</strong>
          <span>{{ post.description }}</span>
          <small>{{ post.date }}</small>
        </button>
        <p v-if="keyword && results.length === 0" class="empty-state">没有找到相关文章。</p>
      </div>
    </section>
  </div>
</template>
