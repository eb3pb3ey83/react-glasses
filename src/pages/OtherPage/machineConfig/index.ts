import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events } from './event'
import { EventType } from './eventType'
import { actions } from './actions'

const machine = Machine<Context, Schema, Events>({
  context: {
    currentPage: 1,
    page_size: 10,
    role_type: '1',
  },
  initial: 'viewMode',
  states: {
    viewMode: {
      on: {
        [EventType.PAGE_CHANGE]: { actions: actions.changePage },
        [EventType.ROLE_CHANGE]: { actions: actions.changeRole },
      },
    },
  },
})

export default machine
