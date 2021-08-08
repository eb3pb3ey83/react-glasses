import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { newsInfoResponseProps, newsInfoReqProps } from './model'

const url = 'news/manage'

export function getNewsInfo(params: newsInfoReqProps, openUnAuthAlert: () => void): Promise<AxiosResponse<newsInfoResponseProps>> {
  return getService<newsInfoResponseProps, ApiConfig<newsInfoReqProps>>(
    {
      config: {
        url: `${url}/${params.id}`,
        method: 'get',
        params,
      },
      name: apiKey.getNewsInfo,
    },
    openUnAuthAlert,
  )
}
