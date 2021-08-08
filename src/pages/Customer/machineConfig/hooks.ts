import { useMachine } from '@xstate/react'
import machine from '.'
import { OrderChangeContact } from './event'
import { EventType } from './eventType'

export const useCompanyMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    searchKeyword(keyword: string) {
      send({ type: EventType.KEYWORD_CHANGE, keyword })
    },
    searchCountryType(country_type: 'all' | '1' | '2') {
      send({ type: EventType.COUNTRY_CHANGE, country_type })
    },
    changeFlag(flag: 'all' | '0' | '1' | '2') {
      send({ type: EventType.FLAG_CHANGE, flag })
    },
    changeRole(role: 'all' | '3' | '1' | '2') {
      send({ type: EventType.ROLE_CHANGE, role })
    },
    changePage(page: number) {
      send({ type: EventType.PAGE_CHANGE, page })
    },
    changeOrder(order: OrderChangeContact['order']) {
      send({ type: EventType.ORDER_CHANGE, order })
    },
  }

  return {
    ...actions,
    context: state.context,
  }
}
