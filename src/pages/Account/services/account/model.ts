import { sortProps } from 'src/shared/components/ItemWithSort/model'

export interface Roles {
  id: number
  role_name_ch: string
  role_name_en: string
  role_type: string
  created_time: string
}
export interface AccountResponseModel {
  id: number
  email: string
  dept_name_ch: string
  dept_name_en: string
  open_flag: '0' | '1' | '2'
  open_flag_name: string

  user_name_ch: string
  user_name_en: string
  created_time: string
  roles: Roles[]
}

export interface AccountList {
  result_data: AccountResponseModel[]
  pagination: {
    current_page: number
    current_page_value_from: number
    current_page_value_to: number
    links: { next: string; previous: null }
    num_values: number
    total_pages: number
  }
}

export interface AccountResquestModel {
  page?: number
  user_name?: string
  roles?: string
  depts?: string
  order?: sortProps
  open_flag?: '0' | '1' | '2' | 'all'
}
