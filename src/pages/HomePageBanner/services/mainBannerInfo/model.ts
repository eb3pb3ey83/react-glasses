export interface mainBannerInfoRequestModel {
  id: string
}

export interface mainBannerInfoResponseModel {
  return_code: string
  return_message: string
  result_data: Resultdata
}

export interface Resultdata {
  id: number
  country_type: string
  created_time: string
  created_user: Createduser
  updated_time: string
  updated_user: Createduser
  sort: number
  open_flag: string
  ban_type: string
  banner_content: Bannercontent[]
}

export interface Bannercontent {
  id: number
  language: string
  banner_id: number
  ban_title: string
  ban_web_img: string
  ban_web_img_id: number
  ban_mobile_img: string
  ban_mobile_img_id: number
  ban_link?: any
  ban_target?: any
  updated_time: string
  updated_user: number
  created_time: string
  created_user: number
}

interface Createduser {
  user_name_ch: string
  user_name_en: string
}
