import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events } from './event'
import { EventType } from './eventType'
import { actions } from './actions'

const machine = Machine<Context, Schema, Events>({
  context: {
    page: 1,
    page_size: 10,
    keyword: '',
    order: 'company_name',
    country_type: '1',
    open_flag: 'all',
  },
  initial: 'viewMode',
  states: {
    viewMode: {
      on: {
        [EventType.PAGE_CHANGE]: { actions: actions.changePage },
        [EventType.KEYWORD_CHANGE]: { actions: actions.changeKeyword },
        [EventType.ORDER_CHANGE]: { actions: actions.changeOrder },
        [EventType.FLAG_CHANGE]: { actions: actions.changeFlag },
        [EventType.ROLE_CHANGE]: { actions: actions.changeRole },
        [EventType.COUNTRY_CHANGE]: { actions: actions.changeCountry },
      },
    },
  },
})

export default machine
