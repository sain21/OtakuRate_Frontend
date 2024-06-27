import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FeedView from '../views/FeedView.vue';
import RatingOverview from '../views/RatingOverview.vue';
import AnimeListView from '../views/AnimeListView.vue';
import WatchlistView from '../views/WatchlistView.vue';
import RegisterView from '../views/RegisterView.vue';
import SignInView from '../views/SignInView.vue';
import Feed from '../views/FeedView.vue';

const routes = [
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
    component: RatingOverview
  },
  {
    path: '/animes',
    name: 'animes',
    component: AnimeListView
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: WatchlistView
  },
  {
    path: "/register",
    name: 'register',
    component: RegisterView
  },
  {
    path: "/sign-in",
    name: 'sign-in',
    component: SignInView
  },
  {
    path: "/feed",
    name: 'feed',
    component: Feed,
    meta: {
      requiresAuth: true,
    },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You need to be logged in to access this page");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
