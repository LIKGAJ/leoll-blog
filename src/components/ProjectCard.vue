<script setup lang="ts">
import type { Project } from '../data/projects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="project-card">
    <div>
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
    </div>
    <div class="tag-row">
      <span v-for="item in project.tech" :key="item" class="tag">{{ item }}</span>
    </div>
    <div class="project-links">
      <a v-if="project.github" :href="project.github" target="_blank" rel="noreferrer">GitHub</a>
      <span v-else>GitHub: Coming Soon</span>
      <a v-if="project.demo" :href="project.demo" target="_blank" rel="noreferrer">Demo</a>
      <span v-else>Demo: Coming Soon</span>
    </div>
  </article>
</template>
