<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  <main class="site-main">
    <RouterView />
  </main>
  <Footer />
</template>
