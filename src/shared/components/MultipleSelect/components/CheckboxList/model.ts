import { Items } from '../../model'

export interface Props {
  items: Items[]
  selectedvalue: Items[]
  onChange: (item: Items) => void
  [key: string]: unknown
}
