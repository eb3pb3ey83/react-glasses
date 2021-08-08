import { AccountInfoReponseModel, AccountInfoRequestModel } from './model'
import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'

const url = 'account/user'

export function getAccountInfo(params: AccountInfoRequestModel, openUnAuthAlert: () => void): Promise<AxiosResponse<AccountInfoReponseModel>> {
  return getService<AccountInfoReponseModel, ApiConfig<AccountInfoReponseModel>>(
    {
      config: {
        url: `${url}/${params.id}`,
        method: 'get',
      },
      name: apiKey.accountInfo,
    },
    openUnAuthAlert,
  )
}
