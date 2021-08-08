import { DeepMap, FieldError } from 'react-hook-form'

export type FormErrors = DeepMap<
  {
    roleType: number
    roleNameEn: string
    roleNameCh: string
    menusButtonsId: string
  },
  FieldError
>
