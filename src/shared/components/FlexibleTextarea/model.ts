import { ChangeEvent } from 'react'

export interface Props {
  onChange?: (event: ChangeEvent) => void
  disabled?: boolean
  [key: string]: unknown
  isError?: boolean
}
