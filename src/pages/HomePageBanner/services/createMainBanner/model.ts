export interface createMainBannerRequest {
  ban_link: string
  ban_mobile_img_id: number
  ban_target: string
  ban_title: string
  ban_web_img_id: number
  language: string
}

export interface CreateParams {
  ban_type: '1' | '2'
  country_type: '1' | '2'
}

export interface Newssection {
  language: string
  section_content: string
  section_image?: number
  section_sort: number
  section_type: number
}
