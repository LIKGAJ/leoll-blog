<script setup lang="ts">
import type { Post } from '../utils/posts'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article class="post-card">
    <RouterLink class="post-card__title" :to="`/posts/${post.slug}`">
      {{ post.title }}
    </RouterLink>
    <p>{{ post.description }}</p>
    <div class="meta-row">
      <span>{{ post.date }}</span>
      <span>{{ post.category }}</span>
      <span>{{ post.readingTime }}</span>
    </div>
    <div class="tag-row" aria-label="文章标签">
      <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </article>
</template>
