export interface otherDetailParms {
  open_flag: string
  other_id: number
}

export interface otherDetailListProps {
  return_code: string
  return_message: string
  result_data: Resultdata
}

export interface Resultdata {
  id: number
  title: string[]
  other_type: string
  country_type: string
  open_flag: string
  updated_time: string
  updated_user: Updateduser
  created_time: string
  created_user: Updateduser
  sections: Section[]
}

interface Section {
  id: number
  language: string
  section_type: string
  section_content: string
  section_image?: any
  section_image_id?: any
  section_sort: number
}

interface Updateduser {
  user_name_ch: string
  user_name_en: string
}
