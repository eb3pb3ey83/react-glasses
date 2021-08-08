import React from 'react'
import { Control, DeepMap, FieldError } from 'react-hook-form'
import { UseMutateFunction } from 'react-query'
import { SendAcountEmailModel } from '../../services/accountOpen/model'
import { FormModel } from './formConfig/model'

export type FormErrors = DeepMap<FormModel, FieldError>

export const FormToolsContext = React.createContext<null | {
  control: Control<FormModel>
  errors: FormErrors
  register: () => void
  handleCheck: (id: number) => void
  removeItem: (itemList: number[], currentId: number) => void
  setValue: (name: string, value: unknown, config?: Partial<{ shouldValidate: boolean; shouldDirty: boolean }> | undefined) => void
  watchedMainDeptId: number | null
  watchedSubDeptId: number | null
  watchedRoles: number[] | []
  hasQueryPermission: boolean
  hasUpdatePermission: boolean
  sendEmail: UseMutateFunction<unknown, unknown, SendAcountEmailModel, unknown>
  watchedOpenFlag?: '0' | '1' | '2'
  openFlag?: '0' | '1' | '2'
  email?: string
}>(null)
