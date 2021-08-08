import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { actionProps, DateProps, TimeProps } from '../FormContent/model'

export interface Props {
  roleType?: string
  langListLocal: SysLanguageItem[] | undefined
  langListForign: SysLanguageItem[] | undefined
  openToast: (message: string) => void
}

export interface dateValidate {
  date: { from?: Date | undefined; to?: Date | undefined; error: { from: boolean; to: boolean } }
  time: { from: Date | string; to: Date | string; error: { from: boolean; to: boolean } }
  setDate: (arg: { from?: Date | undefined; to?: Date | undefined; error: { from: boolean; to: boolean } }) => void
  setTime: (arg: { from: Date | string; to: Date | string; error: { from: boolean; to: boolean } }) => void
}
export type dateValue = { from?: Date | undefined; to?: Date | undefined; error: { from: boolean; to: boolean } }
export type timeValue = { from: Date | string; to: Date | string; error: { from: boolean; to: boolean } }
export type setDateProp = (arg: dateValue) => void
export type setTimeProp = (arg: timeValue) => void
export interface setDateError {
  value: dateValue
  isRange: boolean
}
export interface setDateErrorT {
  value: timeValue
  isRange: boolean
}

export interface passStates {
  areaValue: number | string
  setAreaValue?: (arg: number | string) => void
  timeValue: number | string
  setTimeValue: (arg: number | string) => void
  selectedDay: DateProps
  setSelectedDay: (arg: DateProps) => void
  pickTime: TimeProps
  setPickTime: (arg: TimeProps) => void
  langTab: number | string
  setLangTab: (arg: number | string) => void

  dispatch: React.Dispatch<actionProps>
  langList: SysLanguageItem[]
  isCountyDisabled: boolean
  hasDeletePermission?: boolean
  hasUpdatePermission?: boolean
}

export interface stateProps {
  [key: number]: Array<contentProps>
  // 'zh-TW': Array<contentProps>
}
export interface contentProps {
  sort: number
  type: 0 | 1 | 2 | 3
  payload: {
    [key: string]: unknown
    error: { limit: boolean; empty: boolean } | boolean
  }
  id?: number
}
