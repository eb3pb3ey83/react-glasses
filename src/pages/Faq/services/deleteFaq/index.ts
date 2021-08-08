import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { DeleteFaqModel } from './model'

const url = 'faq'

export function deleteFaq(data: DeleteFaqModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<DeleteFaqModel>>(
    {
      config: {
        url: `${url}/${data.id}`,
        method: 'delete',
        data: { country_type: data.country_type },
      },
      name: apiKey.deleteFaq,
    },
    openUnAuthAlert,
  )
}
