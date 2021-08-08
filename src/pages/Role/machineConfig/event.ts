import { EventType } from './eventType'

export interface PageChange {
  type: EventType.PAGE_CHANGE
  page: number
}
export interface OrderChange {
  type: EventType.ORDER_CHANGE
  order_by: '-role_name_ch' | '-role_type' | '-created_time' | '-updated_time' | 'role_name_ch' | 'role_type' | 'created_time' | 'updated_time'
}
export interface KeywordChange {
  type: EventType.KEYWORD_CHANGE
  keyword: string
}
export interface RoleChange {
  type: EventType.ROLE_CHANGE
  role_type: '0' | '1' | '2'
}

export type Events = PageChange | OrderChange | KeywordChange | RoleChange
