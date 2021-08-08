export interface AccountInfoRequestModel {
  id: string
}

interface Role {
  id: number
  role_name_ch: string
  role_name_en: string
  role_type: string
  created_time: string
  open_flag: string
  created_user: number
  updated_user: number
}

export interface AccountInfoModel {
  id: number

  email: string
  password: string
  dept_id: number
  dept_name_ch: string
  dept_name_en: string
  open_flag: '0' | '1' | '2'
  open_flag_name: string
  user_name_ch: string
  user_name_en: string
  created_user: number
  updated_user: number
  created_time: string
  roles: Role[]

  dept: {
    id: number
    dept_name_ch: string
    dept_name_en: string
    parent_id: null
    sub_dept?: {
      id: number
      dept_name_ch: string
      dept_name_en: string
      parent_id: number
    }
  }
}

export interface AccountInfoReponseModel {
  result_data: AccountInfoModel
}
