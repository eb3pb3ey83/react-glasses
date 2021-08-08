import { EventType } from './eventType'

export interface PageChange {
  type: EventType.PAGE_CHANGE
  page: number
}
export interface RoleChange {
  type: EventType.ROLE_CHANGE
  role_type: '1' | '2'
}

export type Events = PageChange  | RoleChange
