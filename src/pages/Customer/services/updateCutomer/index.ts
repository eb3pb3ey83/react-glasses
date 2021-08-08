import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { ReqProps } from './model'

const url = 'customer'

export function updateCustomer(data: ReqProps): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<ReqProps[]>>({
    config: {
      url,
      method: 'patch',
      data,
    },
    name: apiKey.updateCustomer,
  })
}
