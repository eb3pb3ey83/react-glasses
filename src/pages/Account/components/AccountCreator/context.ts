import React from 'react'
import { Control, DeepMap, FieldError } from 'react-hook-form'
import { FormModel } from './formConfig/model'

export type FormErrors = DeepMap<FormModel, FieldError>

export const FormToolsContext = React.createContext<null | {
  control: Control<FormModel>
  errors: FormErrors
  register: () => void
  handleCheck: (id: number) => void
  removeItem: (itemList: number[], currentId: number) => void
  setValue: (name: string, value: unknown, config?: Partial<{ shouldValidate: boolean; shouldDirty: boolean }> | undefined) => void
}>(null)
