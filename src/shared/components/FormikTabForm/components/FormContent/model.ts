import { ErrorDetailList } from '../../model'

export interface Props {
  index: number
  tabName: string
  fieldName: string
  setError: (error: ErrorDetailList) => void
  item: {
    jsx: JSX.Element | JSX.Element[]
    [key: string]: unknown
  }
  isHidden: boolean
}
