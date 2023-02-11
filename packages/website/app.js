import { createApp as createVueApp } from 'vue'
import { createStore } from './store/index.js'
import Outlet from './outlet/index.js'
import { createRouter } from './router.js'

export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = createVueApp({
    ...Outlet
  }).use(store).use(router)
  app.config.errorHandler = (err, instance, info) => {
    console.error(err, instance, info)
  }
  return app
}
