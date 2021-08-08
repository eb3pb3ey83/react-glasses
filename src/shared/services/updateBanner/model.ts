export interface UpdateBannerData {
  ban_link?: string

  ban_mobile_img_id?: number

  ban_target?: string

  ban_title?: string

  ban_web_img_id?: number

  language?: string
}

export interface UpdateBannerModel {
  data: UpdateBannerData[] | UpdateBannerModel
  id: string
}
