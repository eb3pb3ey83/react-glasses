import { DeepMap, FieldError } from 'react-hook-form'
import { InputType } from '../model'

export interface FormModel {
  language: string
  info: Record<string, InputType>
  fieldName: Record<string, string>
  [key: string]: unknown
}

export interface FormDataModel {
  faq_sections: FormModel[]
}

export interface FormImgModel {
  language: string
  section_content: string
  section_type: number
  isHiddenLabel: boolean
  section_image: number
  section_sort: number
}

export type FormErrors = DeepMap<
  {
    faq_sections: {
      [key: string]: { message: string }
    }[]
  },
  FieldError
>

export enum EditType {
  title = 'title',
  text = 'text',
  bigImg = 'bigImg',
  video = 'video',
  smallImg = 'smallImg',
  hidden = 'hidden',
}
