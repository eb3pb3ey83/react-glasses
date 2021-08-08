import { OrderChangeContact } from './../../../pages/Contact/machineConfig/event'
import { AccountOrder } from 'src/pages/Account/model'
import { OrderChange } from 'src/pages/Role/machineConfig/event'
import { sortProps } from '../ItemWithSort/model'

export interface Props {
  sortMethod?:
    | ((orderBy: AccountOrder) => void)
    | ((orderBy: OrderChange['order_by']) => void)
    | ((orderBy: OrderChangeContact['order']) => void)
    | ((orderBy: OrderChange['order_by'] | AccountOrder) => void)
  sortDown: sortProps | AccountOrder | OrderChange['order_by'] | OrderChangeContact['order']
  sortUp: sortProps | AccountOrder | OrderChange['order_by'] | OrderChangeContact['order']
}
