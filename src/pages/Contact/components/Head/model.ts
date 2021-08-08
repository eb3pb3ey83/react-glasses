import { OrderChangeContact } from '../../machineConfig/event'

export interface Props {
  headCells: HeadCells[]
  sortMethod: (orderBy: OrderChangeContact['order']) => void
}

export interface HeadCells {
  id: string
  label: string
  width?: number | string
  sort: string
}
