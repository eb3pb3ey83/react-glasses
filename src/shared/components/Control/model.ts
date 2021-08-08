export interface Props {
  autoComplete?: AutoComplete
  selects?: Array<Selects>
  button?: Button
}
interface AutoComplete {
  key: string
  placeholder?: string
  onSubmit: (value: string) => void
}

export interface Selects {
  defaultValue?: string | number
  placeholder?: string
  width?: number
  onChange: ((value?: string | number) => void) | React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>
  style?: React.CSSProperties
  option: Array<SelectOptions>
  isDisplay?: boolean
}

interface SelectOptions {
  value: string | number | undefined
  label: string
}

interface Button {
  hasPermission?: boolean
  style?: React.CSSProperties
  width?: number
  height?: number
  onClick: () => void
  startIcon?: JSX.Element
  label?: string
}
