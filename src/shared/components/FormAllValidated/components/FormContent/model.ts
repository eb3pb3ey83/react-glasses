import { ArrayField, Control } from 'react-hook-form'
import { FormErrors, FormModel } from '../../FormConfig/model'
import { ErrorDetailList, FieldTypes } from '../../model'

export interface Props {
  disabled: boolean
  defaultFieldType: FieldTypes[]
  index: number
  errors?: FormErrors
  onRemove: () => void
  register: () => void
  control: Control<{
    faq_sections: FormModel[] | never[]
  }>
  item: Partial<ArrayField<FormModel>>
  setError: (error: ErrorDetailList) => void
  currentLanguage?: string
}
