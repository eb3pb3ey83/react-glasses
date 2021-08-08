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
    keyword: '',
    order_by: '-news_datestart',
    publicStatus: '0',
    role_type: '1',
  },
  initial: 'viewMode',
  states: {
    viewMode: {
      on: {
        [EventType.PAGE_CHANGE]: { actions: actions.changePage },
        [EventType.KEYWORD_CHANGE]: { actions: actions.changeKeyword },
        [EventType.ORDER_CHANGE]: { actions: actions.changeOrder },
        [EventType.ISPUBLIC_CHANGE]: { actions: actions.changeIsPublic },
        [EventType.ROLE_CHANGE]: { actions: actions.changeRole },
      },
    },
  },
})

export default machine
