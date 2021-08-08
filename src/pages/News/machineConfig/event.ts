import { EventType } from './eventType'
import { sortProps } from 'src/shared/components/ItemWithSort/model'

export interface PageChange {
  type: EventType.PAGE_CHANGE
  page: number
}
export interface OrderChange {
  type: EventType.ORDER_CHANGE
  order_by: sortProps
}
export interface KeywordChange {
  type: EventType.KEYWORD_CHANGE
  keyword: string
}
export interface IsPublicChange {
  type: EventType.ISPUBLIC_CHANGE
  publicStatus: string
}
export interface RoleChange {
  type: EventType.ROLE_CHANGE
  role_type: '1' | '2'
}

export type Events = PageChange | OrderChange | KeywordChange | IsPublicChange | RoleChange
