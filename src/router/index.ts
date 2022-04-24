import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '~/utils/auth'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const whiteList = ['/login', '/']

router.beforeEach((to, from, next) => {
  if (to.path !== from.path)
    NProgress.start()

  if (to.meta.redirect) {
    return next({
      path: to.meta.redirect as string,
    })
  }

  const hasToken = getToken()
  if (hasToken) {
    // 已登录
    if (to.path === '/login')
      next({ path: '/' })
    else
      next()
  }
  else {
    // 未登录
    if (whiteList.includes(to.path))
      next()

    else
      next('/login')
  }
})

router.afterEach(() => { NProgress.done() })
