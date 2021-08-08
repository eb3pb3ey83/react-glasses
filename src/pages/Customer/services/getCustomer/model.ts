export interface customerReqProps {
  open_flag: string
  customer_id: string
  role_type: string
  order_by: string
  page: number
  page_size?: number
  filter?: string
  user_name?: string
}

export interface CustomerResProps {
  return_code: string
  return_message: string
  result_data: Resultdata
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

interface Resultdata {
  data: Datum[]
  company_no: string
  company_name: string
  f_company_name?: unknown
}

export interface Datum {
  user_id: number
  role_type: string
  job_title: string
  email: string
  open_flag: string
  user_name_ch: string
  created_time: string
  role_type_name: string
}

export interface SelectCustomerValue {
  name: string
  user_id: number
}

export interface CustomerOption {
  label: string
  value: SelectCustomerValue | number
}
