import getService from '../../../core/services/base'
import apiKey from '../../../core/services/base/apiKey'

const url = 'account/auth/reset_password'

export interface EmailModel {
  email: string
}

export function postEmail({ email }: EmailModel): Promise<unknown> {
  return getService({
    config: {
      url,
      method: 'post',
      data: { email, platform: '1' },
    },
    name: apiKey.patchResetPassword,
    withAccessToken: false,
  })
}
