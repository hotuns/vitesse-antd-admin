import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import type { ResData } from '../api/global'
import { useUserStoreWithOut } from '../store/modules/user'
import { getToken } from './auth'
import { useMessage } from '~/composables/useMessage'

const { createMessage } = useMessage()
// baseURL
const BASE_URL = import.meta.env.MODE === 'development' ? import.meta.env.VUE_APP_API_BASE_URL : ''

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    // 请求头 token配置
    const token = getToken()

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      }
      // config.headers['Authorization'] = token;
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data as ResData<any>
    // 正确状态
    if (res.code === 0)
      return res.result || true

    // 登录失效
    if (res.code === -1)
      useUserStoreWithOut().logout()

    // 异常
    createMessage.error(res.message)
    return undefined
  },
  (error) => {
    console.log(`err${error}`) // for debug
    // 没权限时，不再重复提示
    if (error === '没有操作权限') return
    createMessage.error('网络超时，稍后再试吧')
  },
)

const request = <T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      })
      // throw new Error('请配置正确的请求参数');
    }
    else {
      return instance.request<T, T>({
        url: config,
        ...options,
      })
    }
  }
  else {
    return instance.request<T, T>(config)
  }
}
export function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, options)
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'POST' }, options)
}

export default request
export type { AxiosInstance, AxiosResponse }
