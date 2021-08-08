export interface DetailPageContactResresponseModel {
  return_code: string
  return_message: string
  result_data: Resultdatum[]
}

export interface Resultdatum {
  id: number
  created_user: Createduser
  created_time: string
  updated_user: Createduser
  updated_time: string
  type: string
  country_type: string
  companies: Company[]
}

export interface Company {
  id: number
  contact: number
  language: string
  company_name: string
  address: string
  phone: string
  fax: string
  email: string
  website_link: string
  facebook_link: string
  youtube_link: string
  business_time: string
}

export interface Createduser {
  user_name_ch: string
  user_name_en: string
}
