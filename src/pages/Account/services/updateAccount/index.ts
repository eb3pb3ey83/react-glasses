import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { UpdateAccountModel } from './model'

const url = 'account/user'

export function updateAccount(data: UpdateAccountModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<UpdateAccountModel>>(
    {
      config: {
        url: `${url}/${data.id}`,
        method: 'patch',
        data: data.updateData,
      },
      name: apiKey.updateAccount,
    },
    openUnAuthAlert,
  )
}
