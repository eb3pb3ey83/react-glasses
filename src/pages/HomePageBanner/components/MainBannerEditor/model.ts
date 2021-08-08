import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { Resultdata } from 'src/shared/services/getBanner/model'
import { actionProps } from '../FormContent/model'

export interface Props {
  roleType?: string
  list?: Resultdata[]
  langListLocal: SysLanguageItem[] | undefined
  langListForign: SysLanguageItem[] | undefined
  openToast: (message: string) => void
}

export interface passStates {
  areaValue: number | string
  setAreaValue?: (arg: number | string) => void
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

export interface postSectionsProps {
  id?: number
  language: string
  section_content: string
  section_image?: number
  section_sort: number
  section_type: number
}
