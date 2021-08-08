import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import predicator from 'src/utils/predicator'
import { AccountList, AccountResquestModel } from './model'

const url = 'account/user'

export function getAccountList(params: AccountResquestModel, openUnAuthAlert: () => void, language?: string): Promise<AxiosResponse<AccountList>> {
  return getService<AccountList, ApiConfig<AccountResquestModel>>(
    {
      config: {
        url,
        method: 'get',
        headers: {
          'Accept-language': language ? language : 'en-US',
        },
        params: predicator(params),
      },
      name: apiKey.account,
    },
    openUnAuthAlert,
  )
}
