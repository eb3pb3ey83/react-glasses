import { ReactElement } from 'react'

export interface Props {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value?: string) => void
  classNames?: {
    label?: string
    radioGroup?: string
    radio?: string
  }
  label: string | ReactElement
  className?: string
  radios: Array<radioProps>
  [key: string]: unknown
}
export interface radioProps {
  value: string | number
  label: string
}

export const AreaSysCode: AreaSysCodeInterface = {
  1: 'TLN',
  2: 'ULN',
}

interface AreaSysCodeInterface {
  [key: string]: string
}
