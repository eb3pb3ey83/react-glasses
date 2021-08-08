// import { sortProps } from 'src/shared/components/ItemWithSort/model'
import { EventType } from './eventType'

export interface PageChange {
  type: EventType.PAGE_CHANGE
  page: number
}

export interface FlagChange {
  type: EventType.FLAG_CHANGE
  flag: 'all' | '0' | '1' | '2'
}

export interface RoleChange {
  type: EventType.ROLE_CHANGE
  role: 'all' | '3' | '1' | '2'
}

export interface OrderChangeContact {
  type: EventType.ORDER_CHANGE
  order:
    | 'company_name'
    | '-company_name'
    | 'company_no'
    | '-company_no'
    | 'company_type'
    | '-company_type'
    | 'open_flag'
    | '-open_flag'
    | 'user_name'
    | '-user_name'
    | 'email'
    | '-email'
    | 'role_type'
    | '-role_type'
    | 'job_title'
    | '-job_title'
    | 'created_time'
    | '-created_time'
    | string
}
export interface KeywordChange {
  type: EventType.KEYWORD_CHANGE
  keyword: string
}
export interface CountryChange {
  type: EventType.COUNTRY_CHANGE
  country_type: 'all' | '1' | '2'
}

export type Events = PageChange | OrderChangeContact | KeywordChange | CountryChange | FlagChange | RoleChange
