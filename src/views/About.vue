<script setup lang="ts">
import { useSeo } from '../utils/seo'

useSeo(() => ({
  title: '关于我',
  description: '关于 LEOLL Blog 的技术关注方向与技术栈。',
  path: '/about',
}))

const focusItems = ['Linux', 'Java', 'AI', 'Docker', 'DevOps', 'Cloud Computing']

const stacks = [
  { group: 'Frontend', items: ['Vue', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Java', 'Spring Boot'] },
  { group: 'DevOps', items: ['Linux', 'Docker', 'Git'] },
  { group: 'AI', items: ['LLM', 'AI Application'] },
]
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">About Me</p>
    <h1>关于我</h1>
    <p>我是一个持续学习和实践技术的人。</p>
  </section>

  <section class="container about-grid">
    <div class="about-block">
      <h2>主要关注</h2>
      <div class="tag-row">
        <span v-for="item in focusItems" :key="item" class="tag">{{ item }}</span>
      </div>
    </div>

    <div class="about-block">
      <h2>Technology Stack</h2>
      <div class="stack-grid">
        <section v-for="stack in stacks" :key="stack.group" class="stack-card">
          <h3>{{ stack.group }}</h3>
          <ul>
            <li v-for="item in stack.items" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>
