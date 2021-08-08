import { useMachine } from '@xstate/react'
import machine from '.'
import { OrderChange } from './event'
import { EventType } from './eventType'

export const useRoleMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    searchKeyword(keyword: string) {
      send({ type: EventType.KEYWORD_CHANGE, keyword })
    },
    searchRoleType(role_type: '0' | '1' | '2') {
      send({ type: EventType.ROLE_CHANGE, role_type })
    },
    changePage(page: number) {
      send({ type: EventType.PAGE_CHANGE, page })
    },
    changeOrder(order_by: OrderChange['order_by']) {
      send({ type: EventType.ORDER_CHANGE, order_by })
    },
  }

  return {
    ...actions,
    context: state.context,
  }
}
