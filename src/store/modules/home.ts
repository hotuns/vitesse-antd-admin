import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStoreWithOut } from './user'
import { store } from '~/store'
import fetchApi from '~/api/home'
import type { ResInfoList } from '~/api/home/model'

import pages from '~pages'
import { clearMenuItem, filterRoutes } from '~/utils/layout'
import { filterAsyncRoutes } from '~/utils/permission'

interface layoutConfig {
  menuWidth: number
  menuData: RouteRecordRaw[]
}
interface HomeState {
  info: Nullable<ResInfoList>
  layoutConf: layoutConfig
}

export const useHomeStore = defineStore({
  id: 'app-home',
  state: (): HomeState => ({
    // info
    info: null,
    layoutConf: {
      menuWidth: 208,
      menuData: [],
    },
  }),
  getters: {
    getInfo(): Nullable<ResInfoList> {
      return this.info || null
    },
  },
  actions: {
    setInfo(info: Nullable<ResInfoList>) {
      this.info = info
    },
    resetState() {
      this.info = null
    },
    async getLayoutConf(): Promise<layoutConfig> {
      if (this.layoutConf.menuData.length === 0) {
        const userStore = useUserStoreWithOut()
        const userinfo = await userStore.getUserInfo()
        let allRoutes: RouteRecordRaw[] = []
        if (userinfo)
          allRoutes = [...filterAsyncRoutes(pages, userinfo!.roles)]

        const menuData = filterRoutes(
          clearMenuItem(allRoutes).filter(n => n.path.startsWith('/app/')),
        )

        this.layoutConf.menuData = menuData
      }

      return this.layoutConf
    },
    /**
     * @description: login
     */
    async fetchInfo() {
      const res = await fetchApi.info()
      if (res) {
        // save token
        this.setInfo(res)
      }
      return res
    },
  },
})

// Need to be used outside the setup
export function useHomeStoreWithOut() {
  return useHomeStore(store)
}
