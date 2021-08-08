import { EventType } from './eventType'

export interface OpenCreator {
  type: EventType.OPEN_CREATOR
}
export interface OpenEditor {
  type: EventType.OPEN_EDITOR
  id?: number
}
export interface CloseDrawer {
  type: EventType.CLOSE_DRAWER
}

export type Events = OpenCreator | OpenEditor | CloseDrawer
