import { FaqResponseModel } from '../../services/queryListFaq/model'

export interface SortTableListInfo {
  list: FaqResponseModel[]
  isCh: boolean
  openEditor: (id: number) => void
}
