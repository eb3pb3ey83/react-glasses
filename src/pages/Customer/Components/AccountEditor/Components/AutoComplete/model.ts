import { OptionsType, OptionTypeBase } from 'react-select'
import { dataObject } from 'src/shared/types/data.type'

export interface Props<OptionSchema> {
  options: SelectItem[]
  setInputValue: (val: string) => void
  inputValue: string | undefined
  onPageUpdated: (isInit: boolean) => void
  onValueSelected?: (value: OptionSchema) => void
  [key: string]: unknown
  onSelect?: React.Dispatch<React.SetStateAction<OptionTypeBase | OptionsType<OptionTypeBase> | null>>
}

export interface SelectItem {
  label: string
  value: string | number | dataObject
}

// interface Datum {
//   user_id: number;
//   role_type: string;
//   job_title?: string;
//   email: string;
//   open_flag: string;
//   user_name_ch: string;
//   created_time: string;
//   role_type_name: string;
// }
