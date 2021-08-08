import getService from '../../../core/services/base'
import apiKey from '../../../core/services/base/apiKey'

const url = 'account/auth/reset_password'

export function getResetPasswordToken(token: string, openUnAuthAlert: () => void): Promise<unknown> {
  return getService(
    {
      config: {
        url,
        method: 'get',
        params: { token },
      },
      name: apiKey.getResetPasswordToken,
      withAccessToken: false,
    },
    openUnAuthAlert,
  )
}
