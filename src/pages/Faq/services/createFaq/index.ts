import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { CreateFaqModel } from './model'

const url = 'faq'

export function createFaq(data: CreateFaqModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<CreateFaqModel>>(
    {
      config: {
        url,
        method: 'post',
        data,
      },
      name: apiKey.createFaq,
    },
    openUnAuthAlert,
  )
}
