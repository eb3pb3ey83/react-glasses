import { useMachine } from '@xstate/react'
import machine from '.'
import { EventType } from './eventType'

export const useToastMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    closeToast() {
      send({ type: EventType.CLOSE_TOAST })
    },
    openToast(message: string, isError?: boolean) {
      send({ type: EventType.OPEN_TOAST, message, isError: !!isError })
    },
  }

  return {
    ...actions,
    isError: state.context.isError,
    isToastOpen: state.matches('toastOpened'),
    toastMessage: state.context.toastMessage,
    autoHideDuration: state.context.autoHideDuration,
  }
}
