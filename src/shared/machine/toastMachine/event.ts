import { EventType } from './eventType'

export interface OpenToast {
  type: EventType.OPEN_TOAST
  isError: boolean
  message: string
}
export interface CloseToast {
  type: EventType.CLOSE_TOAST
}
export type Events = OpenToast | CloseToast
