import { Resultdatum } from 'src/pages/Customer/services/getERPCompany/model'

export interface UseInputValueModel {
  initialOption?: SelectItem
  onInputChangeProps?: (value: string) => void
  onPageUpdated?: ({ isInit }: { isInit: boolean }) => void
  determineDropUp?: () => void
}

export interface Props<OptionSchema> {
  options: SelectItem[]
  isLoading?: boolean
  isError?: boolean

  initialOption?: SelectItem
  onInputChange?: (value: string) => void
  onPageUpdated: ({ isInit }: { isInit: boolean }) => void
  onValueSelected?: (value: OptionSchema, initializeOption: () => void) => void
  [key: string]: unknown
}

export interface SelectItem {
  label: string
  value: string | number | Resultdatum
}
