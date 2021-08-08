export interface RoleResponseModel {
  id: number
  role_name_ch: string
  role_name_en: string
  role_type: string
  created_time: string
}

export interface RoleList {
  result_data: RoleResponseModel[]
  pagination: {
    current_page: number
    current_page_value_from: number
    current_page_value_to: number
    links: { next: string; previous: null }
    num_values: number
    total_pages: number
  }
}

export interface RoleResquestModel {
  page?: number
  keyword?: string
  order_by?: '-role_name_ch' | '-role_type' | '-created_time' | '-updated_time' | 'role_name_ch' | 'role_type' | 'created_time' | 'updated_time'
  role_type?: '0' | '1' | '2'
  page_size?: number
}
