<script setup lang="ts">
import PostCard from '../components/PostCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
import { posts } from '../utils/posts'
import { useSeo } from '../utils/seo'

useSeo(() => ({
  title: '记录技术、项目与成长',
  description: 'LEOLL Blog 记录 Linux、Java、AI、Docker、DevOps 与项目开发实践。',
  path: '/',
}))

const latestPosts = posts.slice(0, 5)
</script>

<template>
  <section class="hero container">
    <div class="hero__content">
      <p class="eyebrow">Linux · Java · AI · Docker · DevOps</p>
      <h1>LEOLL</h1>
      <p class="hero__lead">记录技术、项目与成长。</p>
      <p class="hero__intro">
        这里记录我在 Linux、Java、AI、云计算以及项目开发中的学习与实践。
      </p>
      <div class="hero__actions">
        <RouterLink class="button button--primary" to="/posts">查看文章</RouterLink>
        <RouterLink class="button button--ghost" to="/projects">查看项目</RouterLink>
      </div>
    </div>
    <div class="hero__panel" aria-label="技术方向">
      <span>Linux</span>
      <span>Java</span>
      <span>AI</span>
      <span>Cloud</span>
      <span>DevOps</span>
    </div>
  </section>

  <section class="section container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Latest Posts</p>
        <h2>最近文章</h2>
      </div>
      <RouterLink to="/posts">查看全部</RouterLink>
    </div>
    <div class="post-grid">
      <PostCard v-for="post in latestPosts" :key="post.slug" :post="post" />
    </div>
  </section>

  <section class="section section--muted">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Projects</p>
          <h2>项目作品</h2>
        </div>
        <RouterLink to="/projects">查看项目</RouterLink>
      </div>
      <div class="project-grid">
        <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
      </div>
    </div>
  </section>
</template>
