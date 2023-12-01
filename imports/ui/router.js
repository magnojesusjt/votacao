import { createRouter, createWebHistory } from 'vue-router'
import Home from './index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/qrCode',
      name: 'QRcode',
      component: () => import('./qrCode.vue'),
    },
    {
      path: '/resultado',
      name: 'resultado',
      component: () => import('./resultado.vue'),
    },
  ],
})
