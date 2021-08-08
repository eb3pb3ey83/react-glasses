import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { UpdateFaqModel } from './model'

const url = 'faq'

export function updateFaq(data: UpdateFaqModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<UpdateFaqModel>>(
    {
      config: {
        url: `${url}/${data.id}`,
        method: 'put',
        data: { faq_sections: data.faq_sections },
      },
      name: apiKey.updateFaq,
    },
    openUnAuthAlert,
  )
}
