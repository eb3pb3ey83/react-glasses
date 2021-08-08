import { AlertModel } from './model'

interface Context {
  alertMessage: AlertModel
  hasQueryPermission: boolean
  hasUpdatePermission: boolean
}

export default Context
