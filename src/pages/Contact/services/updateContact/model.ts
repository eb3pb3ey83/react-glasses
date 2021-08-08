export interface UpdateContactModel {
  id: string

  updataDataInfo: UpdateDataInfo
}

interface UpdateDataInfo {
  contact_sections: Contactsection[]
  country_type: string
  type: string
}

interface Contactsection {
  address: string
  business_time: string
  company_name: string
  email: string
  facebook_link: string
  fax: string
  id: number
  language: string
  phone: string
  website_link: string
  youtube_link: string
}
