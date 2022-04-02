import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from) => {
  console.log('beforeEach')
})

export default (app: App) => app.use(router)
