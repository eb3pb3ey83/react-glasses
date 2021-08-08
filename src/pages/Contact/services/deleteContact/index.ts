import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { DeleteContactModel } from './model'

const url = 'contact'

export function deleteContact(data: DeleteContactModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<DeleteContactModel>>(
    {
      config: {
        url: `${url}/${data.id}`,
        method: 'delete',
      },
      name: apiKey.deleteContact,
    },
    openUnAuthAlert,
  )
}
