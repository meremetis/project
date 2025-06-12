import { createRouter, createWebHistory } from 'vue-router'
import DiscoveryView from '../views/DiscoveryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'discovery',
      component: DiscoveryView,
    },
    {
      path: '/favorite',
      name: 'favorite',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FavoriteView.vue'),
    },
  ],
})

export default router
