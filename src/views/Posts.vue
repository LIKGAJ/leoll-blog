<script setup lang="ts">
import { computed, ref } from 'vue'
import PostCard from '../components/PostCard.vue'
import { categories, posts, searchPosts, tags } from '../utils/posts'
import { useSeo } from '../utils/seo'

useSeo(() => ({
  title: '文章',
  description: 'LEOLL Blog 的技术文章列表，包含 Linux、Java、AI、Docker、DevOps 等内容。',
  path: '/posts',
}))

const keyword = ref('')
const activeCategory = ref('全部')
const activeTag = ref('')

const filteredByCategory = computed(() =>
  activeCategory.value === '全部'
    ? posts
    : posts.filter((post) => post.category === activeCategory.value),
)

const filteredPosts = computed(() => {
  const byTag = activeTag.value
    ? filteredByCategory.value.filter((post) => post.tags.includes(activeTag.value))
    : filteredByCategory.value

  return searchPosts(keyword.value, byTag)
})
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Posts</p>
    <h1>文章</h1>
    <p>记录技术学习、实践和思考。</p>
  </section>

  <section class="container layout-with-sidebar">
    <aside class="filters">
      <label class="field-label" for="post-search">搜索文章</label>
      <input
        id="post-search"
        v-model="keyword"
        class="text-input"
        type="search"
        placeholder="标题、摘要、标签、分类"
      />

      <div class="filter-group">
        <strong>分类</strong>
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :class="{ active: activeCategory === category }"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div class="filter-group">
        <strong>标签</strong>
        <button
          type="button"
          :class="{ active: activeTag === '' }"
          @click="activeTag = ''"
        >
          全部
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          :class="{ active: activeTag === tag }"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </aside>

    <div class="post-list">
      <PostCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
      <p v-if="filteredPosts.length === 0" class="empty-state">没有找到匹配的文章。</p>
    </div>
  </section>
</template>
