import { FaqResponseModel } from '../../services/queryListFaq/model'

export interface SortTableItemInfo {
  value: FaqResponseModel
  isCh: boolean
  className?: string
  onClick: () => void
  index: number
}
