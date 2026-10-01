<script setup lang="ts">
import { useSeo } from '../utils/seo'

useSeo(() => ({
  title: '页面不存在',
  description: '你访问的页面不存在，返回首页继续浏览 LEOLL Blog。',
  path: '/404',
}))
</script>

<template>
  <section class="page-hero container not-found">
    <p class="eyebrow">404</p>
    <h1>页面不存在</h1>
    <p>你访问的链接不存在，或者已经被移动。</p>
    <div class="hero__actions">
      <RouterLink class="button button--primary" to="/">返回首页</RouterLink>
      <RouterLink class="button button--ghost" to="/posts">查看文章</RouterLink>
    </div>
  </section>
</template>
