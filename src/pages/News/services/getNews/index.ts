import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { newsParamsProps, newsListProps } from './model'

const url = 'news/manage'

export function getNewsList(openUnAuthAlert: () => void, params: newsParamsProps, language?: string): Promise<AxiosResponse<newsListProps>> {
  return getService<newsListProps, ApiConfig<newsParamsProps>>(
    {
      config: {
        url,
        method: 'get',
        headers: {
          'Accept-language': language ? language : 'en-US',
        },
        params,
      },
      name: apiKey.news,
    },
    openUnAuthAlert,
  )
}
