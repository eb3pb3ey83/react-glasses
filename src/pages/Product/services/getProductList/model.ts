export interface ProductListResponse {
  return_code: string
  return_message: string
  result_data: ProductListDataArray[]
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

export interface ProductListDataArray {
  id: number
  product_name: string
  sub_type_id: number
  type_no: string
  country_type: string
  market_type: string
  is_simulation: string
  status: string
  sort: number
  brand_name: string
}

export interface ProductListReq {
  type_id?: number
  country_type?: number
}
