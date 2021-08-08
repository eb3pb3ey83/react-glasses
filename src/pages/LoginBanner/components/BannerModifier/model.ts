import { Control, DeepMap, FieldError } from 'react-hook-form/dist/types'

export interface Props {
  control: Control<{
    ban_title: string
    ban_web_img_id: number | null
  }>
  register: () => void
  errors?: DeepMap<
    {
      ban_title: string
      ban_web_img_id: number
    },
    FieldError
  >
  imageUrl?: string
  hasUpdatePermission?: boolean
}
