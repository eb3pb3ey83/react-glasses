import { DeepMap, FieldError } from 'react-hook-form'

export interface Props {
  closeDrawer: () => void
  openToast: (message: string) => void
  roleType: string
  isCreate?: boolean
}

export type FormErrors = DeepMap<
  {
    faq_sections: {
      [key: string]: {
        message: string
      }
    }[]
  },
  FieldError
>
