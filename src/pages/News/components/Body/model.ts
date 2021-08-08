export interface Props {
  list?: RootObject[]
  isLoading?: boolean
}

export interface RootObject {
  id: number
  country_type: string
  news_datestart: string
  news_dateend?: any
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
