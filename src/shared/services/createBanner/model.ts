export interface CreateBannerData {
  ban_link?: string

  ban_mobile_img_id?: number

  ban_target?: string

  ban_title?: string

  ban_web_img_id?: number

  language?: string
}

export interface CreateBannerModel {
  data: CreateBannerData[] | CreateBannerModel
  ban_type?: '1' | '2'
  country_type?: '1' | '2'
}
