import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback } from '@okta/okta-vue'
import { navigationGuard } from '@okta/okta-vue'
import HomeView from '../views/HomeView.vue'
import LoginComponent from '../views/LoginComponent.vue'
import ProfileComponent from '../views/ProfileComponent.vue'

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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/rate',
      name: 'rate',
      component: () => import ('../views/RatingOverview.vue')
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
      path: '/login',
      name: 'Login',
      component: LoginComponent
    },
    {
      path: '/login/callback',
      component: LoginCallback
    },
    {
      path: '/profile',
      component: ProfileComponent,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(navigationGuard)
export default router