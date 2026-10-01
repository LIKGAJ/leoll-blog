import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import PostDetail from '../views/PostDetail.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/posts', name: 'posts', component: Posts },
    { path: '/posts/:slug', name: 'post-detail', component: PostDetail },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/about', name: 'about', component: About },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
