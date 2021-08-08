export interface stateProps {
  [key: number]: Array<contentProps>
  // 'zh-TW': Array<contentProps>
}
export interface contentProps {
  type: string
  payload: {
    [key: string]: unknown
    error: { limit: boolean; empty: boolean } | boolean
  }
  id?: number
}
export interface actionProps {
  act: 'update' | 'create' | 'delete' | 'reInit'
  lang: number
  type?: string
  payload?: {
    [key: string]: unknown
  }
  initData?: stateProps
}
