import { DoneEventObject } from 'xstate'

type ResetEvent =
  | { type: 'RESET' }
  | { type: 'SEND' }
  | { type: 'RESET_PAGE_SEND' }
  | { type: 'CLOSE' }
  | { type: 'TICK' }
  | { type: 'GET_TOKEN_FAILED' }
  | { type: 'SEND_EMAIL' }
  | DoneEventObject

export default ResetEvent
