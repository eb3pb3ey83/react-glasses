import { Resultdata } from 'src/shared/services/getBanner/model'

export interface SortTableListInfo {
  list: Resultdata[]
  isCh: boolean
  openEditor?: (id: number) => void
}
