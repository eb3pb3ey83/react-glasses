import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events } from './event'
import { EventType } from './eventType'
import { actions } from './actions'

const machine = Machine<Context, Schema, Events>({
  initial: 'toastClosed',
  context: {
    toastMessage: '',
    autoHideDuration: 3000,
    isError: false,
  },
  states: {
    toastClosed: {
      on: {
        [EventType.OPEN_TOAST]: { target: 'toastOpened', actions: actions.openToast },
      },
    },
    toastOpened: {
      on: {
        [EventType.CLOSE_TOAST]: 'toastClosed',
      },
    },
  },
})

export default machine
