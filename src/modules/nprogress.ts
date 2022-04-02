import NProgress from 'nprogress'
import { router } from './router'

export default () => {
  router.beforeEach((to: { path: any }, from: { path: any }) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => { NProgress.done() })
}
