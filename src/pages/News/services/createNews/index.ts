import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { newsData } from './model'
const url = 'news/manage'

export function createNews(data: newsData, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<newsData>>(
    {
      config: {
        url,
        method: 'post',
        data,
      },
      name: apiKey.createNews,
    },
    openUnAuthAlert,
  )
}
