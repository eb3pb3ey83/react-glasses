export interface CreateContactModel {
  contact_sections: Contactsection[]
  country_type: string
  type: string
}

export interface ContactFormDataModel {
  faq_sections: Contactsection[]
}

export interface Contactsection {
  id?: number
  address: string
  business_time: string
  company_name: string
  email: string
  facebook_link: string
  fax: string
  language: string
  phone: string
  website_link: string
  youtube_link: string
}
