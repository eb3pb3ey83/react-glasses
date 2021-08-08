export interface contactParams {
  company_name?: string
  country_type: string
  order?: string
  page_size?: number
  page?: number
}

export interface contactListProps {
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
  country_type: string
  updated_time: string
  companies: string[]
  updated_user_ch: string
  updated_user_en: string
  type_name: string
}
