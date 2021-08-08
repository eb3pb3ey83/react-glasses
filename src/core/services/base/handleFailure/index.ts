import authConfig from '../../../../utils/authConfig'
import showLogger from '../showLogger'
import { dataObject } from '../../../../shared/types/data.type'
import { ApiConfig } from '..'

export default function handleFailure(
  error: { response: dataObject; [key: string]: unknown },
  apiInfo: ApiConfig,
  unAuthAlert?: () => void,
): Promise<never> {
  showLogger(`${apiInfo.name}_FAILURE`, error, true)

  const isUnauthorized = error.response.status === 403 || error.response.status === 401

  if (isUnauthorized) {
    if (unAuthAlert) {
      unAuthAlert()
      window.localStorage.removeItem('ACCESS_TOKEN')
      window.localStorage.removeItem('isLogin')
    } else {
      authConfig.logOut()
    }
  }

  return Promise.reject(error)
}
