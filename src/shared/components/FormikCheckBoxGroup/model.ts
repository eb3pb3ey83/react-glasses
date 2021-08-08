interface Button {
  id: number
  button_name: string
  button_name_ch: string
  button_name_en: string
  sort: number
  button_code: string
  open_flag: string
  isChose: string
}

export interface Props {
  id: number
  title?: string
  label?: string
  name: string
  disabled?: boolean
  checkButtons: Button[]
  [key: string]: unknown
}

export type RolesIndexType = 'roles1' | 'roles2' | 'roles3'
export type RolesAllIndexType = 'roles1_all' | 'roles2_all' | 'roles3_all'
