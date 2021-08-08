import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { UpdateContactModel } from './model'

const url = 'contact'

export function updateContact(data: UpdateContactModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<UpdateContactModel>>(
    {
      config: {
        url: `${url}/${data.id}`,
        method: 'put',
        data: data.updataDataInfo,
      },
      name: apiKey.updateContact,
    },
    openUnAuthAlert,
  )
}
