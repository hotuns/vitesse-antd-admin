export interface ReqParams {
  username: string
  password: string
}

export interface ReqAuth {
  auths: string[]
  roles: string[]
}

export interface ResResult {
  login_status: number
  st: string
  token: string
}
