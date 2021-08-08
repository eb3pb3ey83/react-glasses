import { useMachine } from '@xstate/react'
import { useCountryType } from 'src/shared/hooks/useCountryType'
import machine from '.'
import { OrderChangeContact } from './event'
import { EventType } from './eventType'

export const useContactMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    searchKeyword(company_name: string) {
      send({ type: EventType.KEYWORD_CHANGE, company_name })
    },
    searchCountryType(country_type: '1' | '2') {
      send({ type: EventType.ROLE_CHANGE, country_type })
    },
    changePage(page: number) {
      send({ type: EventType.PAGE_CHANGE, page })
    },
    changeOrder(order: OrderChangeContact['order']) {
      send({ type: EventType.ORDER_CHANGE, order })
    },
  }

  useCountryType(actions.searchCountryType)

  return {
    ...actions,
    context: state.context,
  }
}
