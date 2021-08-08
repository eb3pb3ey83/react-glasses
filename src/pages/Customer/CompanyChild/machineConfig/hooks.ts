import { useMachine } from '@xstate/react'
import { useToastMachine } from 'src/shared/machine/toastMachine/hooks'
import { machineCustomer, machineDealer } from '.'
import { OrderChangeContact } from '../../machineConfig/event'
import { EventType } from '../../machineConfig/eventType'

export const useCustomerMachine = () => {
  const [state, send] = useMachine(machineCustomer)

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
    changeRole(role: 'all' | '1' | '2' | '3') {
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

export const useDealerMachine = () => {
  const [state, send] = useMachine(machineDealer)

  const actions = {
    searchKeyword(keyword: string) {
      send({ type: EventType.KEYWORD_CHANGE, keyword })
    },
    changeFlag(flag: 'all' | '0' | '1' | '2') {
      send({ type: EventType.FLAG_CHANGE, flag })
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

export const useAccountToastMachine = () => {
  const {
    isToastOpen: isSuccessToastOpen,
    openToast: openSuccessToast,
    closeToast: closeSuccessToast,
    toastMessage: successToastMessage,
    autoHideDuration,
    isError,
  } = useToastMachine()

  const {
    isToastOpen: isEmailToastOpen,
    openToast: openEmailToast,
    closeToast: closeEmailToast,
    toastMessage: emailToastMessage,
    isError: isEmailError,
  } = useToastMachine()

  const openToast = ({ message, error }: { message: string[]; error: boolean[] }) => {
    openSuccessToast(message[0], error[0])
    message[1] && openEmailToast(message[1], error[1])
  }

  const closeAllToast = () => {
    closeSuccessToast()
    isEmailToastOpen && closeEmailToast()
  }

  return {
    openToast,
    closeAllToast,
    closeSuccessToast,
    closeEmailToast,
    isSuccessToastOpen,
    isEmailToastOpen,
    successToastMessage,
    autoHideDuration,
    emailToastMessage,
    isError,
    isEmailError,
  }
}
