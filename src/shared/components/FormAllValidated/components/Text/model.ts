import { Control, DeepMap, FieldError } from 'react-hook-form'
import { FormModel } from '../../FormConfig/model'

export interface Props {
  disabled: boolean
  isHiddenLabel: boolean
  index: number
  value: string
  defaultValue: string
  isHidden: boolean
  onRemove: () => void
  control: Control<{ faq_sections: FormModel[] | never[] }>
  name: string
  fieldName?: string
  error?: DeepMap<{ message: string }, FieldError>
  errorMessage?: FieldError
}
