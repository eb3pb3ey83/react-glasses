import { useMachine } from '@xstate/react'
import machine from '.'
import { EventType } from './eventType'
import { sortProps } from 'src/shared/components/ItemWithSort/model'

export const useAccountMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    searchKeyword(user_name: string) {
      send({ type: EventType.KEYWORD_CHANGE, user_name })
    },
    changePage(page: number) {
      send({ type: EventType.PAGE_CHANGE, page })
    },
    changeOrder(order: sortProps) {
      send({ type: EventType.ORDER_CHANGE, order })
    },
    changeRoles(roles: number[]) {
      send({ type: EventType.ROLES_CHANGE, roles })
    },
    changeDepts(depts: number[]) {
      send({ type: EventType.DEPTS_CHANGE, depts })
    },
    changeOpenFlag(openFlag: '0' | '1' | '2' | 'all') {
      send({ type: EventType.OPEN_FLAG_CHANGE, open_flag: openFlag })
    },
  }

  return {
    ...actions,
    isToastOpen: state.matches('toastOpened'),
    context: state.context,
  }
}
