import authConfig from 'src/utils/authConfig'
import { useMachine } from '@xstate/react'

import machine from '.'
import { EventType } from './eventType'
import { AlertModel } from './model'

export const useAccountEditorMachine = () => {
  const hasQueryPermission = authConfig.getPermissions('user:qry')
  const hasUpdatePermission = authConfig.getPermissions('user:up')

  const [state, send] = useMachine(machine, {
    context: { hasQueryPermission, hasUpdatePermission },
  })

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
    hasQueryPermission: state.context.hasQueryPermission,
    hasUpdatePermission: state.context.hasUpdatePermission,
  }
}
