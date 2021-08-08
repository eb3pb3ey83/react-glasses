import { useMachine } from '@xstate/react'
import { useCountryType } from 'src/shared/hooks/useCountryType'
import machine from '.'
import { OrderChange } from './event'
import { EventType } from './eventType'

export const useNewsMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    searchKeyword(keyword: string) {
      send({ type: EventType.KEYWORD_CHANGE, keyword })
    },
    changeIsPublic(publicStatus: string) {
      send({ type: EventType.ISPUBLIC_CHANGE, publicStatus })
    },
    changePage(page: number) {
      send({ type: EventType.PAGE_CHANGE, page })
    },
    changeOrder(order_by: OrderChange['order_by']) {
      send({ type: EventType.ORDER_CHANGE, order_by })
    },
    searchRoleType(role_type: '1' | '2') {
      send({ type: EventType.ROLE_CHANGE, role_type })
    },
  }

  useCountryType(actions.searchRoleType)

  return {
    ...actions,
    context: state.context,
  }
}
