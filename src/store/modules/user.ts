import { defineStore } from 'pinia'
import { useHomeStoreWithOut } from './home'
import { store } from '~/store'
import type { ReqAuth, ReqParams } from '~/api/user/model'
import fetchApi from '~/api/user'
// import { encryptByDES } from '~/utils/crypto';
import { getToken, removeToken, setToken } from '~/utils/auth'
import { router } from '~/router'

interface UserState {
  token: string
  info: Nullable<ReqAuth>
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // token
    token: '',
    info: null,
  }),
  getters: {
    getToken(): string {
      return this.token || getToken()
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info ?? '' // for null or undefined value
      setToken(info)
    },
    setUserInfo(info: any) {
      this.info = info
    },
    resetState() {
      this.token = ''
      this.info = null
    },
    /**
     * @description: login
     */
    async login(params: ReqParams) {
      // 密码加密
      // params.password = encryptByDES(params.password);
      const res = await fetchApi.login(params)
      if (res) {
        // save token
        this.setToken(res.token)

        await this.getUserInfo()
      }
      return res
    },

    /**
     * @description: logout
     */
    async logout() {
      this.resetState()
      const homeState = useHomeStoreWithOut()
      homeState.$reset()
      removeToken()
      router.replace('/login')
    },

    async getUserInfo() {
      if (!this.info) {
        const res = await fetchApi.getUserInfo()
        if (res) {
          // save userinfo
          this.setUserInfo(res)
        }
      }

      return this.info
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
