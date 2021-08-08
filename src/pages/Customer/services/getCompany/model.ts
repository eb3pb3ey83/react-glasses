export interface customParms {
  open_flag: string
  company_model: string
  country_type: string
  order_by: string
  page_size?: number
  page?: number
  company_name?: string
}

export interface customResProps {
  return_code: string
  return_message: string
  result_data: Resultdatum[]
  pagination: Pagination
}

interface Pagination {
  current_page: number
  total_pages: number
  current_page_value_from: number
  current_page_value_to: number
  num_values: number
  links: Links
}

interface Links {
  next?: unknown
  previous?: unknown
}

export interface Resultdatum {
  id: number
  company_model: string
  company_no: string
  company_name: string
  country_id: number
  parent_id?: unknown
  tel: string
  order_chk: string
  open_flag: string
  company_type: string
  company_type_name: string
  user_name: string
}
