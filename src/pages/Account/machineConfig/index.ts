import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events } from './event'
import { EventType } from './eventType'
import { actions } from './actions'

const machine = Machine<Context, Schema, Events>({
  context: {
    currentPage: 1,
    user_name: '',
    order: '-created_time',
    toastMessage: '',
    roles: [],
    depts: [],
    open_flag: 'all',
  },
  initial: 'viewMode',
  states: {
    viewMode: {
      on: {
        [EventType.PAGE_CHANGE]: { actions: actions.changePage },
        [EventType.KEYWORD_CHANGE]: { actions: actions.changeKeyword },
        [EventType.ORDER_CHANGE]: { actions: actions.changeOrder },
        [EventType.ROLES_CHANGE]: { actions: actions.changeRoles },
        [EventType.DEPTS_CHANGE]: { actions: actions.changeDepts },
        [EventType.OPEN_FLAG_CHANGE]: { actions: actions.changeOpenFlag },
      },
    },
  },
})

export default machine
