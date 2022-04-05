import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '~/store'
import fetchApi from '~/api/user'
import { filterAsyncRoutes } from '~/utils/permission'
import page from '~pages'

interface PermissioState {
  isGetUserInfo: boolean // 是否获取过用户信息
  isAdmin: 0 | 1 // 是否为管理员
  auths: string[] // 当前用户权限
  modules: string[] // 模块权限
}

export const usePermissioStore = defineStore({
  id: 'app-permission',
  state: (): PermissioState => ({
    // isGetUserInfo
    isGetUserInfo: false,
    // isAdmin
    isAdmin: 0,
    // auths
    auths: [],
    // modules
    modules: [],
  }),
  getters: {
    getAuths(): string[] {
      return this.auths
    },
    getModules(): string[] {
      return this.modules
    },
    getIsAdmin(): 0 | 1 {
      return this.isAdmin
    },
    getIsGetUserInfo(): boolean {
      return this.isGetUserInfo
    },
  },
  actions: {
    setAuth(auths: string[], modules: string[]) {
      this.auths = auths
      this.isGetUserInfo = true
      this.modules = modules
    },
    setIsAdmin(isAdmin: 0 | 1) {
      this.isAdmin = isAdmin
    },
    resetState() {
      this.isGetUserInfo = false
      this.isAdmin = 0
      this.auths = []
      this.modules = []
    },

    /**
     * @name fetchAuths
     * @description 获取当前用户权限
     */
    async fetchAuths() {
      const res = await fetchApi.permission()
      if (res) {
        this.setAuth(res.auths, res.modules)
        this.setIsAdmin(res.is_admin || 0)
        console.log(res)
      }
      return res
    },

    /**
     * @name buildRoutesAction
     * @description: 获取路由
     */
    async buildRoutesAction(): Promise<RouteRecordRaw[]> {
      let routes = page

      console.log(routes)
      console.log(page)

      // 404 路由一定要放在 权限路由后面
      // let routes: RouteRecordRaw[] = []

      if (this.getIsAdmin !== 1) {
        // 普通用户
        // 1. 方案一：过滤每个路由模块涉及的接口权限，判断是否展示该路由
        // 2. 方案二：直接检索接口权限列表是否包含该路由模块，不做细分，axios同一拦截
        routes = [
          ...filterAsyncRoutes(routes, this.modules),
        ]
      }

      return routes
    },
  },
})

// Need to be used outside the setup
export function usePermissioStoreWithOut() {
  return usePermissioStore(store)
}
