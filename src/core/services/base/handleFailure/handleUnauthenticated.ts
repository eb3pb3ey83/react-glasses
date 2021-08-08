import { dataObject } from '../../../../shared/types/data.type'
import authConfig from '../../../../utils/authConfig'

export default function handleUnauthenticated(reason: dataObject): void {
  const { status } = reason

  if (status === 401) {
    authConfig.removeAccessToken()
  }
}
