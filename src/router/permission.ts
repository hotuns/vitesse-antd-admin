/**
 * @name permission
 * @description 全局路由过滤、权限过滤
 */

import { getToken } from '../utils/auth'
import { router } from './index'
import { usePermissioStoreWithOut } from '~/store/modules/permission'

const permissioStore = usePermissioStoreWithOut()
const whiteList = ['/login', '/'] // no redirect whitelist

/** 设置路由守卫 */
router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      next({ path: '/' })
    }
    else {
      // 是否获取过用户信息
      const isGetUserInfo = permissioStore.getIsGetUserInfo
      if (isGetUserInfo) {
        let hasAuth = true
        if ((to.meta.auths) && (to.meta.auths as string[]).length > 0)
          hasAuth = permissioStore.getAuths.some(auth => (to.meta.auths as string[]).includes(auth))

        if (hasAuth)
          next()
        else
          return false
      }
      else {
        // 没有获取，请求数据
        await permissioStore.fetchAuths()
        // 过滤权限路由
        // const routes = await permissioStore.buildRoutesAction()
        // // 404 路由一定要放在 权限路由后面
        // routes.forEach((route) => {
        //   router.addRoute(route)
        // })
        // hack 方法
        // 不使用 next() 是因为，在执行完 router.addRoute 后，
        // 原本的路由表内还没有添加进去的路由，会 No match
        // replace 使路由从新进入一遍，进行匹配即可
        next({ ...to, replace: true })
      }
    }
  }
  else {
    // 未登录
    if (whiteList.includes(to.path))
      next()

    else
      next('/login')
  }
})
