import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from) => {
  if (to.path !== from.path)
    NProgress.start()
})

router.afterEach(() => { NProgress.done() })
