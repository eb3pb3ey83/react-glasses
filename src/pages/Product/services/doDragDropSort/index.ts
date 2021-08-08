import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { SortRequest, SortResponse } from './model'

const url = 'product/type'

export function dragDropSort(data: SortRequest, openUnAuthAlert: () => void): Promise<AxiosResponse<SortResponse>> {
  return getService<SortResponse, ApiConfig<SortRequest>>(
    {
      config: {
        url,
        method: 'patch',
        data,
      },
      name: apiKey.sortProductType,
    },
    openUnAuthAlert,
  )
}
