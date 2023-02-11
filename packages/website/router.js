import { createRouter as createVueRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'

export function createRouter () {
  const router = createVueRouter({
    history: createWebHashHistory(),
    base: '/',
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      return { x: 0, y: 0 }
    },
    routes
  })

  return router
}
