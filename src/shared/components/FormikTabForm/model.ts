import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'

export interface Props {
  tabName: string
  fieldName: string
  components: {
    jsx: JSX.Element | JSX.Element[]
    [key: string]: unknown
  }[]
}

export interface ErrorDetailList {
  tab: string
}

export interface ValidationModel {
  tablist: SysLanguageItem[]
}
