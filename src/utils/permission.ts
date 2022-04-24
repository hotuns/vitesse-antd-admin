/**
 * @name permission
 * @description 路由处理工具
 */

import type { RouteRecordRaw } from 'vue-router'
import intersection from 'lodash-es/intersection'

// 不需要权限过滤的 白名单
export const WhiteList = ['/v1/user/login', '/v1/user/permission', '/v1/account/info']

interface IAuth { roles?: string[] }

export const filterAsyncRoutes = (routes: RouteRecordRaw[], userRoles: string[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  console.log('userRoles', userRoles)
  routes.forEach((route) => {
    const { roles } = (route.meta as IAuth) || {}
    if (!roles) {
      if (route.children)
        route.children = filterAsyncRoutes(route.children, userRoles)

      res.push(route)
    }
    else {
      if (intersection(userRoles, roles).length > 0) {
        if (route.children)
          route.children = filterAsyncRoutes(route.children, userRoles)

        res.push(route)
      }
    }
  })
  return res
}
