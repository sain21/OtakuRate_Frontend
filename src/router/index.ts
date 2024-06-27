import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import your views
import RatingOverview from '../views/RatingOverview.vue';
import AnimeListView from '../views/AnimeListView.vue';
import WatchlistView from '../views/WatchlistView.vue';
import RegisterView from '../views/RegisterView.vue';
import SignInView from '../views/SignInView.vue';
import Feed from '../views/Feed.vue';

const routes = [
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
    path: '/rate', // Define the path for the rate page
    name: 'rate', // Give the route a name
    component: RatingOverview // Use the RatingOverview component for this route
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
