import { AccountResponseModel } from 'src/pages/Account/services/account/model'

export interface Props {
  width?: string | number
  className?: string
  color?: string
  widthWatcher?: (limitedCount: number) => void
  isFetched?: boolean
  hasLabel?: boolean
  isLabelLoaded?: boolean
  accountList?: AccountResponseModel[]
  style?: React.CSSProperties
  [key: string]: unknown
}
