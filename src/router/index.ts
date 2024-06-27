import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      path: '/rate', // Definieren Sie den Pfad für das Forum
      name: 'rate', // Geben Sie der Route einen Namen
      component: () => import ('../views/RatingOverview.vue') // Verwenden Sie die ForumView-Komponente für diese Route
    },
    {
      path: '/animes',
      name: 'animes',
      component: () => import('../views/AnimeListView.vue')
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: () => import('../views/WatchlistView.vue')
    },
    {
      path: '/login/callback',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router