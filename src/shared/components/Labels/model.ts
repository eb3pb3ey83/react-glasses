import { Items } from '../MultipleSelect/model'

export interface Props {
  selectedList: Items[]
  limited?: boolean
  limitedLength?: number
  hasDeleteIcon?: boolean
  onClick?: (item: Items) => void
}
