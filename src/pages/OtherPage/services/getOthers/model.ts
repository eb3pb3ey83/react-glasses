export interface otherParms {
  open_flag: string
  country_type: string
  page_size?: number
  page?: number
}

export interface othersListProps {
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
  next?: any
  previous?: any
}

export interface Resultdatum {
  id: number
  title: string[]
  other_type: string
  country_type: string
  open_flag: string
  updated_time: string
  updated_user: Updateduser
}

interface Updateduser {
  user_name_ch: string
  user_name_en: string
}
