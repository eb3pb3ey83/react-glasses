import { Control, DeepMap, FieldError } from 'react-hook-form'
import { FormModel } from '../../FormConfig/model'

export interface Props {
  disabled: boolean
  name: string
  control: Control<{ faq_sections: FormModel[] | never[] }>
  isHidden: boolean
  error?: DeepMap<
    {
      message: string
    },
    FieldError
  >
  errorMessage?: FieldError
  value?: string
  defaultValue?: string
  fieldName?: string
}
