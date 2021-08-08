import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { FaqList, FaqResquestModel } from './model'

const url = 'faq'

export function getFaqList(openUnAuthAlert: () => void, params: FaqResquestModel, language?: string): Promise<AxiosResponse<FaqList>> {
  return getService<FaqList, ApiConfig<FaqResquestModel>>(
    {
      config: {
        url,
        method: 'get',
        params,
        headers: {
          'Accept-language': language ? language : 'en-US',
        },
      },
      name: apiKey.getFaqList,
    },
    openUnAuthAlert,
  )
}
