import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'

export interface Props {
  roleType: string
  langListLocal: SysLanguageItem[]
  langListForign: SysLanguageItem[]
  openToast: (message: string) => void
}

export type dateValue = { from?: Date | undefined; to?: Date | undefined; error: { from: boolean; to: boolean } }
export type timeValue = { from: Date | string; to: Date | string; error: { from: boolean; to: boolean } }
export type setDateProp = (arg: dateValue) => void
export type setTimeProp = (arg: timeValue) => void
