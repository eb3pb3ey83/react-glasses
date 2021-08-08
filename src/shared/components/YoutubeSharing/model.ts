import { ReactNode } from 'react'

export interface Props {
  onURLChange: (arg: string, arg2: boolean) => void
  url: string
  [key: string]: unknown
  errorMessage?: ReactNode
  readonly?: boolean
}
