import React from 'react'

export interface Props {
  [key: string]: unknown
  isError?: boolean
  errorMessage?: string
  width?: number
  style?: React.CSSProperties
}
