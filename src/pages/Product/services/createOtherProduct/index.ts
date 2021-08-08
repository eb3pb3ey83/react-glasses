import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { RequestProps } from './model'

const url = 'product/other'

export function createOtherProduct(data: RequestProps): Promise<AxiosResponse<{ return_code: string }>> {
  return getService<{ return_code: string }, ApiConfig<RequestProps>>({
    config: {
      url,
      method: 'post',
      data,
    },
    name: apiKey.createOtherProduct,
  })
}
