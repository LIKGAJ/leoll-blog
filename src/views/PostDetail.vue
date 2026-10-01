<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Comments from '../components/Comments.vue'
import { getPostBySlug } from '../utils/posts'
import { useSeo } from '../utils/seo'

const route = useRoute()
const router = useRouter()

const post = computed(() => getPostBySlug(String(route.params.slug)))

watchEffect(() => {
  if (!post.value) {
    router.replace('/posts')
  }
})

useSeo(() => ({
  title: post.value?.title ?? '文章',
  description: post.value?.description ?? '',
  path: `/posts/${route.params.slug}`,
}))
</script>

<template>
  <article v-if="post" class="container article-layout">
    <header class="article-header">
      <RouterLink class="back-link" to="/posts">← 返回文章</RouterLink>
      <p class="eyebrow">{{ post.category }}</p>
      <h1>{{ post.title }}</h1>
      <p>{{ post.description }}</p>
      <div class="meta-row">
        <span>{{ post.date }}</span>
        <span>{{ post.readingTime }}</span>
      </div>
      <div class="tag-row">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </header>

    <div class="article-shell">
      <div class="markdown-body" v-html="post.html"></div>
      <aside class="toc" aria-label="文章目录">
        <strong>文章目录</strong>
        <a
          v-for="item in post.toc"
          :key="item.id"
          :href="`#${item.id}`"
          :class="`toc-level-${item.level}`"
        >
          {{ item.text }}
        </a>
      </aside>
    </div>

    <Comments :key="post.slug" />
  </article>
</template>
