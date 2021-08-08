interface Context {
  currentPage: number
  page_size: number
  keyword: string
  order_by: '-role_name_ch' | '-role_type' | '-created_time' | '-updated_time' | 'role_name_ch' | 'role_type' | 'created_time' | 'updated_time'
  role_type: '0' | '1' | '2'
}

export default Context
