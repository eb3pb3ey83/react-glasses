export interface Props {
  open: boolean
  title: string
  onClose?: () => void
  width?: string | number
  editHistory?: {
    updated_time?: string
    updated_user?: {
      user_name_ch: string
      user_name_en: string
    }
    created_time?: string
    created_user?: {
      user_name_ch: string
      user_name_en: string
    }
  }
  [key: string]: unknown
}
