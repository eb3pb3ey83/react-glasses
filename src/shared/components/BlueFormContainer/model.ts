import { SysLanguageItem } from '../RadioGroupWithLabel/services/SystemLanguage/model'

export interface Props {
  value: string | number
  languageList?: SysLanguageItem[]
  onChange: (arg: string | number) => void
  isFetched?: boolean
  className?: string
}
