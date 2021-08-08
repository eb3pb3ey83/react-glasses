import { Machine, assign } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events, SubmittedList } from './event'

const machine = Machine<Context, Schema, Events>(
  {
    initial: 'close',
    context: {
      submittedList: [],
    },
    states: {
      close: {
        on: {
          INPUT_CLICK: 'expanded',
        },
      },
      expanded: {
        on: {
          SET_SUBMITTED_LIST: {
            target: 'close',
            actions: 'saveSubmittedList',
          },
          INPUT_CLICK: 'close',
        },
      },
    },
  },
  {
    actions: {
      saveSubmittedList: assign({
        submittedList: (_context, event) => {
          const currentEvent = event as SubmittedList
          return currentEvent.submittedList
        },
      }),
    },
  },
)

export default machine
