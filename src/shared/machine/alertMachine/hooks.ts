import { useMachine } from '@xstate/react'
import machine from '.'
import { EventType } from './eventType'
import { AlertModel } from './model'

export const useAlertMachine = () => {
  const [state, send] = useMachine(machine)

  const actions = {
    openAlert(message: AlertModel) {
      send({ type: EventType.OPEN_ALERT, message })
    },
    closeAlert() {
      send({ type: EventType.CLOSE_ALERT })
    },
  }

  return {
    ...actions,
    isAlertOpen: state.matches('alertOpened'),
    alertMessage: state.context.alertMessage,
  }
}
