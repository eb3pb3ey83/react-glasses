import { ResultdatumDealer } from '../../services/getDealer/model'

export interface Props {
  list?: Resultdatum[] | ResultdatumDealer[]
  isLoading?: boolean
  companyId?: string
}

export interface customerProps {
  list?: ResultdatumCus[]
  isLoading?: boolean
  baseUrl?: string
}

export interface RootObject {
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

interface Resultdatum {
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

export interface RootObjCus {
  return_code: string
  return_message: string
  result_data: ResultdatumCus[]
  pagination: PaginationCus
}

interface PaginationCus {
  current_page: number
  total_pages: number
  current_page_value_from: number
  current_page_value_to: number
  num_values: number
  links: LinksCus
}

interface LinksCus {
  next?: any
  previous?: any
}

export interface ResultdatumCus {
  user_id: number
  role_type: string
  job_title: string
  email: string
  open_flag: string
  user_name_ch?: string
  user_name_en?: string
  created_time: string
  role_type_name: string
}
