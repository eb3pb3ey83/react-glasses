import { ProductListDataArray } from '../../services/getProductList/model'

export interface SortTableListInfo<T> {
  list?: Array<T>
  itemOnClick: (id?: number) => void
  getHeadandBody?: HeadandBody
}
export type ListItem = Record<string, unknown>

export type ListParam = ProductListDataArray & { type_name: string; is_show: string }
export type HeadandBody = (list?: ListParam) => BodyType
export type BodyType = {
  id: string
  sort: string
  label: string
  width: string
  disabledSort: boolean
  content: JSX.Element | string | undefined
}[]
