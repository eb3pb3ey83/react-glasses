import { useMachine } from '@xstate/react'
import { useCountryType } from 'src/shared/hooks/useCountryType'
import machine from '.'
import { EventType } from './eventType'

export const useOtherPageMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    changePage(page: number) {
      send({ type: EventType.PAGE_CHANGE, page })
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
