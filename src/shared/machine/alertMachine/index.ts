import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events } from './event'
import { EventType } from './eventType'
import { actions } from './actions'

const machine = Machine<Context, Schema, Events>({
  context: {
    alertMessage: { title: '', content: '', isDicidedMode: false, confirmBtnLabel: '' },
  },
  initial: 'alertClosed',
  states: {
    alertClosed: {
      on: {
        [EventType.OPEN_ALERT]: {
          target: 'alertOpened',
          actions: actions.openAlert,
        },
      },
    },
    alertOpened: {
      on: {
        [EventType.CLOSE_ALERT]: 'alertClosed',
      },
    },
  },
})

export default machine
