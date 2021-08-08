export interface newsInfoResponseProps {
  return_code: string
  return_message: string
  result_data: Resultdata
}

export interface Resultdata {
  id: number
  country_type: string
  news_datestart: string
  news_dateend: string | null
  created_user: Createduser
  created_time: string
  updated_user: Createduser
  updated_time: string
  news_sections: Newssection[]
}

interface Newssection {
  id: number
  language: string
  section_type: string
  section_content: string
  section_image?: string
}

interface Createduser {
  user_name_ch: string
  user_name_en: string
}

export interface newsInfoReqProps {
  open_flag: '0' | '1'
  id: string
}
