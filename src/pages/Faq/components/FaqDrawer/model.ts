import { DeepMap, FieldError } from 'react-hook-form'

export interface Props {
  closeDrawer: () => void
  openToast: (message: string) => void
  roleType: string
}

export type FormErrors = DeepMap<
  {
    faq_sections: {
      section_content: { message: string }
    }[]
  },
  FieldError
>
