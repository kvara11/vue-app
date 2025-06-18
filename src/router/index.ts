import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/add',
      name: 'Add',
      component: () => import('../views/AddView.vue')
    },
    {
      path: '/view',
      name: 'View',
      component: () => import('../views/TableView.vue')
    },
    {
      path: '/',
      name: 'Start',
      component: () => import('../views/StartView.vue')
    }
  ]
})

export default router 