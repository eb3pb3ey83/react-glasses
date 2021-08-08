import authConfig from 'src/utils/authConfig'
import getService from '../../../core/services/base'
import apiKey from '../../../core/services/base/apiKey'
import { TokenModel } from './model'

const url = 'account/auth/reset_password'

export function patchResetPassword({ password, token }: TokenModel, openUnAuthAlert: () => void): Promise<unknown> {
  const userToken = authConfig.getAccessToken()

  return getService(
    {
      config: {
        url: !token ? url : `${url}?token=${token}`,
        method: 'patch',
        data: { password },
      },
      name: apiKey.patchResetPassword,
      withAccessToken: userToken ? true : false,
    },
    openUnAuthAlert,
  )
}
