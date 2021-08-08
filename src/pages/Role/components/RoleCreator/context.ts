import React from 'react'
import { Control, DeepMap, FieldError } from 'react-hook-form'
import { Button } from '../../services/menuButton/model'

export type FormErrors = DeepMap<
  {
    role_type: number
    role_name_en: string
    role_name_ch: string
    menus_buttons_id: string
  },
  FieldError
>

export const FormToolsContext = React.createContext<null | {
  control: Control<{
    role_type: number
    role_name_en: string
    role_name_ch: string
    menus_buttons_id: [] | number[]
  }>
  errors: FormErrors
  register: () => void
  handleCheck: (id: number, menuButtons: Button[]) => void
  hasSelectItem: boolean
  handleSelectAll: (menuButtons: Button[]) => void
  checkIsSelectAll: (menuButtons: Button[]) => boolean
  checkIsIndeterminate: (menuButtons: Button[]) => boolean
  selectedList: number[]
  setValue: (name: string, value: unknown, config?: Partial<{ shouldValidate: boolean; shouldDirty: boolean }> | undefined) => void
}>(null)
