import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { AlertModel } from 'src/shared/machine/alertMachine/model'

export interface stateProps {
  [key: number]: Array<contentProps>
  // 'zh-TW': Array<contentProps>
}
export interface contentProps {
  type: string
  payload: {
    [key: string]: unknown
    error: { limit: boolean; empty: boolean } | boolean
  }
  id?: number
}
export interface actionProps {
  act: 'update' | 'create' | 'delete' | 'reInit'
  lang: number
  type: string
  payload?: {
    [key: string]: unknown
  }
  initData?: stateProps
}

export interface Props {
  content: stateProps
  allCreateState: {
    // errorTab?: { [key: number]: number }
    areaValue: number | string
    setAreaValue?: (arg: number | string) => void
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
  }
  isCreate?: boolean
}

export interface payLoad {
  [key: string]: unknown
  error: { limit: boolean; empty: boolean } | boolean
}
// interface payloadIn {
//   error: unknown
// }
