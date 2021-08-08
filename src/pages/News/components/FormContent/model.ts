import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { AlertModel } from 'src/shared/machine/alertMachine/model'

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
export interface actionProps {
  act: 'update' | 'create' | 'delete' | 'reInit'
  lang: number
  sort?: number
  type?: 0 | 1 | 2 | 3
  payload?: {
    [key: string]: unknown
  }
  initData?: stateProps
}
export interface reInit {
  act: 'reInit'
  payload: {
    [key: string]: unknown
  }
}

export interface Props {
  content?: stateProps
  allCreateState: {
    // errorTab?: { [key: number]: number }
    contentEmpty: { [key: number]: { [key: number]: boolean } }
    setContentEmpty: (arg: { [key: number]: { [key: number]: boolean } }) => void
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
    contentWithLang?: stateProps
    dispatch: React.Dispatch<actionProps>
    langList: SysLanguageItem[]
    isCountyDisabled: boolean
    hasDeletePermission?: boolean
    hasUpdatePermission?: boolean
    openAlert: (message: AlertModel) => void
    closeAlert: () => void
    setIsdirty?: React.Dispatch<React.SetStateAction<boolean>>
  }
  isCreate?: boolean
}

export interface DateProps {
  from?: Date
  to?: Date
  error: { from: boolean; to: boolean }
}

export interface TimeProps {
  from: Date | string
  error: { from: boolean; to: boolean }
  to: Date | string
}

export interface Newssection {
  language: string
  section_content: string
  section_image?: string | null
  section_image_id?: number
  section_type: string
  id?: number
}

export interface payLoad {
  [key: string]: unknown
  error: { limit: boolean; empty: boolean } | boolean
}
// interface payloadIn {
//   error: unknown
// }
