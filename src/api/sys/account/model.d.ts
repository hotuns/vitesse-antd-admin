export interface ReqAccount {
  id: number
  account?: string
  password?: string
}

export interface ResAccount {
  account: string
  last_login: string
  mobile: string
  role_name: string
  true_name: string
  user_id: number
}

export interface ResPermission { auths: Array<string> }
