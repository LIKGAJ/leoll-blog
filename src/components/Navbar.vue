<script setup lang="ts">
import { ref } from 'vue'
import SearchBox from './SearchBox.vue'
import ThemeToggle from './ThemeToggle.vue'

const menuOpen = ref(false)
const searchOpen = ref(false)

const navItems = [
  { label: '首页', path: '/' },
  { label: '文章', path: '/posts' },
  { label: '项目', path: '/projects' },
  { label: '关于', path: '/about' },
]
</script>

<template>
  <header class="site-header">
    <nav class="navbar container" aria-label="主导航">
      <RouterLink class="brand" to="/" @click="menuOpen = false">LEOLL</RouterLink>

      <button
        class="menu-button"
        type="button"
        aria-label="打开导航菜单"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-content" :class="{ 'is-open': menuOpen }">
        <div class="nav-links">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="nav-actions">
          <button
            class="icon-button"
            type="button"
            aria-label="搜索文章"
            title="搜索文章"
            @click="searchOpen = true"
          >
            ⌕
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
    <SearchBox :open="searchOpen" @close="searchOpen = false" />
  </header>
</template>
