import { FormikProps } from 'formik'
import { ReactNode } from 'react'

export interface FormProps<FormSchema> extends FormikProps<FormSchema> {
  children: ReactNode
  setIsFormError?: React.Dispatch<React.SetStateAction<boolean>>
}
