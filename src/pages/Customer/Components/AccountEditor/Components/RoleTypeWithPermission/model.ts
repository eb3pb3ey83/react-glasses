import { ReactElement } from 'react'

export interface Props {
  name: string
  label?: string | ReactElement
  labelClassName?: unknown
  radios: Array<radioProps>
  [key: string]: unknown
  formControlClasses?: {
    [key: string]: unknown
  }
  style?: Record<string, string>
  isCompany: boolean
}
export interface radioProps {
  value: string | number
  label: string
}
