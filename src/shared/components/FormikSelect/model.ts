import React from 'react'

export interface Props {
  [key: string]: unknown
  placeholder?: string
  isError?: boolean
  width?: number | string
  style?: React.CSSProperties
  selectItems?: Array<{
    label: string
    value: string | number
  }>
  name: string
  label?: string
}
