import { ArrayField, Control } from 'react-hook-form'
import { FormModel } from 'src/shared/components/FormAllValidated/FormConfig/model'
import { FieldTypes } from 'src/shared/components/FormAllValidated/model'
import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { FormErrors } from '../FaqDrawer/model'

export interface Props {
  disabled: boolean
  defaultFieldType: FieldTypes[]
  register: () => void
  setAreaValue: React.Dispatch<React.SetStateAction<string | number>>
  areaValue: string | number
  control: Control<{
    faq_sections: FormModel[] | never[]
  }>
  fields: Partial<ArrayField<FormModel>>[]
  list: SysLanguageItem[]
  append: (value: Partial<Record<string, unknown>> | Partial<Record<string, unknown>>[], shouldFocus?: boolean | undefined) => void
  remove: (index: number) => void
  errors?: FormErrors
  isSubmitted: boolean
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  radioButtonDisabled: boolean
}

export interface ErrorDetailList {
  type?: string
  lan?: string
  index?: number
}
