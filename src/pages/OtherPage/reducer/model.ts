export interface stateProps {
  [key: number]: Array<contentProps>
}
export interface contentProps {
  sort: number
  type: 0 | 1 | 2 | 3
  payload: {
    [key: string]: unknown
    error: { limit: boolean; empty: boolean } | boolean
  }
  id?: number
}
export interface actionProps {
  act: 'update' | 'create' | 'delete' | 'reInit'
  lang: number
  sort?: number
  type?: 0 | 1 | 2 | 3
  payload?: {
    [key: string]: unknown
  }
  initData?: stateProps
}

export interface sectionsProps {
  language: string
  section_content: string
  section_image?: string | null
  section_image_id?: number
  section_type: string
  id?: number
}
