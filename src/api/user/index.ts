import type { ReqAuth, ReqParams, ResResult } from './model'
import { get, post } from '~/utils/http'

enum URL {
  login = '/v1/user/login',
  info = '/v1/account/info',
  logout = '/v1/user/logout',
}

const login = async(data: ReqParams) => post<ResResult>({ url: URL.login, data })

const logout = async() => get<ReqAuth>({ url: URL.logout })

const getUserInfo = async() => get<ReqAuth>({ url: URL.info })

export default { login, logout, getUserInfo }
