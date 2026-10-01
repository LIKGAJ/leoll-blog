<script setup lang="ts">
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
import { useSeo } from '../utils/seo'

useSeo(() => ({
  title: '项目',
  description: 'LEOLL Blog 的项目作品集，展示个人技术项目与实践方向。',
  path: '/projects',
}))
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Projects</p>
    <h1>项目</h1>
    <p>整理个人技术项目、学习产物与实践方向。</p>
  </section>

  <section class="container">
    <div class="project-grid project-grid--wide">
      <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
    </div>
  </section>
</template>
