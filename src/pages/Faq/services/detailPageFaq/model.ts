export interface DetailPageFaqResresponseModel {
  return_code: string
  return_message: string
  result_data: Resultdata
}

export interface Resultdata {
  id: number
  country_type: string
  faq_sort: number
  created_user: Createduser
  created_time: string
  updated_user: Createduser
  updated_time: string
  faq_sections: Faqsection[]
}

export interface Faqsection {
  id: number
  created_time: string
  updated_time: string
  language: string
  section_type: string
  section_content: string
  section_sort: number
  created_user: Createduser
  updated_user: Createduser
  faq: number
  section_image?: unknown
}

interface Createduser {
  user_name_ch: string
  user_name_en: string
}
