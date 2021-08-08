import { Resultdata } from 'src/shared/services/getBanner/model'

export interface SortTableItemInfo {
  id: number
  value: Resultdata
  isCh: boolean
  onClick: () => void
  index: number
}
