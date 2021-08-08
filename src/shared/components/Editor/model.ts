import { ReactNode } from 'react'

export interface Props {
  isShowTab?: boolean
  index?: number
  onDataSet?: (value: OnDataSetInfo) => void
  onDelete?: (id: number) => void
  isDeleteHover?: boolean
  style?: Record<string, string>
  [key: string]: unknown
  errorMessage?: ReactNode
  remove?: (index?: number | number[] | undefined) => void
  onRemove?: () => void
  data?: string
  id?: number
}

export interface OnDataSetInfo {
  data: string
  id: number
}
