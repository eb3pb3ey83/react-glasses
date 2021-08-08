import { Control, DeepMap, FieldError } from 'react-hook-form'
import { FormModel } from '../../FormConfig/model'

export interface Props {
  size: 'big' | 'small'
  name: string
  isHidden: boolean
  control: Control<{ faq_sections: FormModel[] | never[] }>
  onRemove?: () => void
  fieldName?: string
  error?: DeepMap<{ message: string }, FieldError>
  errorMessage?: FieldError
  disabled: boolean
}
