import { Machine } from 'xstate'
import Context from '../../machineConfig/context'
import Schema from '../../machineConfig/schema'
import { Events } from '../../machineConfig/event'
import { EventType } from '../../machineConfig/eventType'
import { actions } from '../../machineConfig/actions'

export const machineCustomer = Machine<Context, Schema, Events>({
  context: {
    page: 1,
    page_size: 10,
    keyword: '',
    order: '-created_time',
    open_flag: 'all',
    role_type: 'all',
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

export const machineDealer = Machine<Context, Schema, Events>({
  context: {
    page: 1,
    page_size: 10,
    keyword: '',
    order: 'company_name',
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
      },
    },
  },
})
