import { BodyType } from '../Drop/model'

export interface SortTableItemInfo<T> {
  value: T & { [key: string]: unknown }
  className?: string
  onClick: () => void
  index: number
  bodyItem?: BodyType
}
