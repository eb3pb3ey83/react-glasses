import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events } from './event'
import { EventType } from './eventType'
import { actions } from './actions'

const machine = Machine<Context, Schema, Events>({
  context: {
    country_id: '',
    country_type: '1',
    toastMessage: '',
  },
  initial: 'viewMode',
  states: {
    viewMode: {
      on: {
        [EventType.COUNTRY_CHANGE]: {
          actions: actions.changeCountry,
        },
      },
    },
  },
})

export default machine
