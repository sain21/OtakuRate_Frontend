import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
// Importieren Sie die ForumView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/forum', // Definieren Sie den Pfad für das Forum
      name: 'forum', // Geben Sie der Route einen Namen
      component: ForumView // Verwenden Sie die ForumView-Komponente für diese Route
    }
  ]
})

export default router