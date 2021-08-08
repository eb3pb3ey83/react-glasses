import { sortProps } from 'src/shared/components/ItemWithSort/model'
import { EventType } from './eventType'

export interface PageChange {
  type: EventType.PAGE_CHANGE
  page: number
}
export interface OrderChange {
  type: EventType.ORDER_CHANGE
  order: sortProps
}
export interface KeywordChange {
  type: EventType.KEYWORD_CHANGE
  user_name: string
}
export interface OpenFlagChange {
  type: EventType.OPEN_FLAG_CHANGE
  open_flag: '0' | '1' | '2' | 'all'
}

export interface RolesChange {
  type: EventType.ROLES_CHANGE
  roles: number[]
}

export interface DeptsChange {
  type: EventType.DEPTS_CHANGE
  depts: number[]
}

export type Events = PageChange | OrderChange | KeywordChange | RolesChange | DeptsChange | OpenFlagChange
