import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { CreateAccountModel } from './model'

const url = 'account/user'

export function createAccount(data: CreateAccountModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<CreateAccountModel>>(
    {
      config: {
        url,
        method: 'post',
        data,
      },
      name: apiKey.createAccount,
    },
    openUnAuthAlert,
  )
}
