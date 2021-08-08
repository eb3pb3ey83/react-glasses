import { EventType } from './eventType'
import { AlertModel } from './model'

export interface OpenAlert {
  type: EventType.OPEN_ALERT
  message: AlertModel
}
export interface CloseAlert {
  type: EventType.CLOSE_ALERT
}
export type Events = OpenAlert | CloseAlert
