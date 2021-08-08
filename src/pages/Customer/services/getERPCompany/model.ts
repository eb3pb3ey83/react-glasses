export interface ERPRequestModel {
  dataType: string
  country_type: string
  filter?: string
  page_size?: number
  page?: number
}
export interface ERPResponseModel {
  return_code: string
  return_message: string
  result_data: Resultdatum[]
  pagination: Pagination
}

export interface Pagination {
  current_page: number
  total_pages: number
  current_page_value_from: number
  current_page_value_to: number
  num_values: number
  links: Links
}

export interface Links {
  next: number
  previous?: unknown
}

export interface Resultdatum {
  company_no: string
  company_name: string
  company_type: string
  saler_no: string
  saler_name: string
  area: string
  country: string
  delivery_address: string
}

export interface ERPOptions {
  label: string
  value: { company_name: string; company_no: string }
}
