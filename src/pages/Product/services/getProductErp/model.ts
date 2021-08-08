export interface ProductERPResponse {
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
  next: number
  previous?: unknown
}

interface Resultdatum {
  product_no: string
  product_name: string
}

export interface ERPOptions {
  label: string
  value: string
}

export interface ProductERPReq {
  filter?: string | null
  page: number
  page_size: number
}
