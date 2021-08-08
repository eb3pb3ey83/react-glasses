import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { SendAcountEmailModel } from './model'

const url = 'account/auth/account_open'

export function sendOpenAccountEmail(params: SendAcountEmailModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<SendAcountEmailModel>>(
    {
      config: {
        url,
        method: 'get',
        params,
      },
      name: apiKey.sendOpenAccountEmail,
    },
    openUnAuthAlert,
  )
}
