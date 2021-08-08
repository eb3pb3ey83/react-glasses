import { OrderChange } from '../../machineConfig/event'

export interface Props {
  sortMethod: (orderBy: OrderChange['order_by']) => void
}
