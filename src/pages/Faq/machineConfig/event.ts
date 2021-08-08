import { EventType } from './eventType'

export interface CountryChange {
  type: EventType.COUNTRY_CHANGE
  country_type?: '1' | '2'
}

export type Events = CountryChange
