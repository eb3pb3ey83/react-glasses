import { sortProps } from 'src/shared/components/ItemWithSort/model'

export interface newsParamsProps {
  country_type: number | undefined
  open_flag: number
  page?: number
  currentPage?: number
  keyword?: string
  order?: sortProps
  page_size?: number
  role_type?: string
  publicStatus?: string
  public?: boolean
}
// export interface newsListProps {
//   return_code: string
//   return_message: string
//   result_data: Resultdatum[]
// }

// interface Resultdatum {
//   id: number
//   country_type: string
//   news_datestart: string
//   news_dateend?: any
//   updated_user: Updateduser
//   updated_time: string
//   news_sections: Newssection[]
// }

// interface Newssection {
//   section_content: string
//   section_image?: any
// }

// interface Updateduser {
//   user_name_ch: string
//   user_name_en: string
// }

export interface newsListProps {
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

interface Links {
  next?: any
  previous?: any
}

export interface Resultdatum {
  id: number
  country_type: string
  news_datestart: string
  news_dateend: string | null
  updated_user: Updateduser
  updated_time: string
  news_sections: Newssection[]
}

interface Newssection {
  section_type: string
  section_content: string
  section_image?: (null | string)[]
}

interface Updateduser {
  user_name_ch: string
  user_name_en: string
}
