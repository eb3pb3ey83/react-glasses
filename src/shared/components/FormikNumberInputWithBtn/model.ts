export interface Props {
  name: string
  label?: string
  labelClassName?: unknown
  placeholder?: string

  formControlClasses?: {
    [key: string]: unknown
  }
  style?: Record<string, string>
  suffix?: React.ReactNode
  [key: string]: unknown
}
