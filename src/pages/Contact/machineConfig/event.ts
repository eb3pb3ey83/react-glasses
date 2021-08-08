// import { sortProps } from 'src/shared/components/ItemWithSort/model'
import { EventType } from './eventType'

export interface PageChange {
  type: EventType.PAGE_CHANGE
  page: number
}
export interface OrderChangeContact {
  type: EventType.ORDER_CHANGE
  order:
    | 'infocontactsection__company_name'
    | '-infocontactsection__company_name'
    | 'area'
    | '-area'
    | 'type'
    | '-type'
    | 'updatedUser'
    | '-updatedUser'
    | 'updatedTime'
    | '-updatedTime'
}
export interface KeywordChange {
  type: EventType.KEYWORD_CHANGE
  company_name: string
}
export interface RoleChange {
  type: EventType.ROLE_CHANGE
  country_type: '1' | '2'
}

export type Events = PageChange | OrderChangeContact | KeywordChange | RoleChange
