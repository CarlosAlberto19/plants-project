
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
{
path: '/',
name: 'home',
component: HomeView,
},
{
path: '/shopping',
name: 'shopping',
component: () => import('../views/ShoppingListView.vue'),
},
// ✅ catch‑all correcto
{
path: '/:pathMatch(.*)*',
redirect: '/',
},
],
})

export default router
