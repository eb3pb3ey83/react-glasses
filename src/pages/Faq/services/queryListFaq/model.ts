export interface FaqResponseModel {
  id: number
  country_type: string
  faq_sort: number
  created_user: Createduser
  created_time: string
  updated_user: Createduser
  updated_time: string
  title: string
  content: string
}

interface Createduser {
  user_name_ch: string
  user_name_en: string
}

export interface FaqList {
  return_code: string
  return_message: string
  result_data: FaqResponseModel[]
}

export interface FaqResquestModel {
  country_id?: string
  country_type?: '1' | '2'
}
