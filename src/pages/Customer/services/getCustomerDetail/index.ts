import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { ReqProps, ResProps } from './model'

const url = 'customer'

export function getCustomerDetail(id?: string, language?: string): Promise<AxiosResponse<ResProps>> {
  return getService<ResProps, ApiConfig<ReqProps>>({
    config: {
      url: `${url}/${id}`,
      method: 'get',
      headers: {
        'Accept-language': language ? language : 'en-US',
      },
    },
    name: apiKey.getCustomerDetal,
  })
}
