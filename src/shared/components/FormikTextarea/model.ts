import { ChangeEvent } from 'react'

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
  onChange?: (event: ChangeEvent) => void

  [key: string]: unknown
}
