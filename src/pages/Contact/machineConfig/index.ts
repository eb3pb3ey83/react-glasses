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
    company_name: '',
    order: '-infocontactsection__company_name',
    role_type: '1',
    country_type: '2',
  },
  initial: 'viewMode',
  states: {
    viewMode: {
      on: {
        [EventType.PAGE_CHANGE]: { actions: actions.changePage },
        [EventType.KEYWORD_CHANGE]: { actions: actions.changeKeyword },
        [EventType.ORDER_CHANGE]: { actions: actions.changeOrder },
        [EventType.ROLE_CHANGE]: { actions: actions.changeRole },
      },
    },
  },
})

export default machine
