import { ArrayField, Control } from 'react-hook-form'
import { SysLanguageItem } from '../RadioGroupWithLabel/services/SystemLanguage/model'
import { FormErrors, FormModel } from './FormConfig/model'

export interface Props {
  defaultFieldType: FieldTypes[]
  register: () => void
  control: Control<{
    faq_sections: FormModel[] | never[]
  }>
  fields: Partial<ArrayField<FormModel>>[]
  tablist: SysLanguageItem[]
  append: (value: Partial<Record<string, unknown>> | Partial<Record<string, unknown>>[], shouldFocus?: boolean | undefined) => void
  remove: (index: number) => void
  errors?: FormErrors
  isSubmitted: boolean
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  isAdd?: boolean
  disabled: boolean
}

export interface ErrorDetailList {
  type?: number
  lan?: string
  index?: number
}

export type InputType = 'title' | 'text' | 'bigImg' | 'smallImg' | 'video' | 'hidden'

export type FieldTypes = Record<string, InputType>
