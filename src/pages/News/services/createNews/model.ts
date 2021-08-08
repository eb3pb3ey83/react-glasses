export interface newsData {
  country_type: number
  news_dateend: string | null
  news_datestart: string
  news_sections: Newssection[]
}

export interface Newssection {
  language: string
  section_content: string
  section_image?: number
  section_sort: number
  section_type: number
}
