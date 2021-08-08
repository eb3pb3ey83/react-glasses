import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { ReqProps, ResPorps } from './model'

const url = 'customer/permission'

export function getCustomerPermission(params: ReqProps, language?: string): Promise<AxiosResponse<ResPorps>> {
  return getService<ResPorps, ApiConfig<ReqProps>>({
    config: {
      url,
      method: 'get',
      params,
      headers: {
        'Accept-language': language ? language : 'en-US',
      },
    },
    name: apiKey.getCustomerPermission,
  })
}
