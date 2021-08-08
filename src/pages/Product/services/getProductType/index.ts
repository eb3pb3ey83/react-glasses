import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { ProductTypeReq } from './model'

const url = 'product/type'

export function getProductType<T>(param?: ProductTypeReq, language?: string, openUnAuthAlert?: () => void): Promise<AxiosResponse<T>> {
  return getService<T, ApiConfig<unknown>>(
    {
      config: {
        url,
        method: 'get',
        params: param ? { language, ...param } : { language },
      },
      name: apiKey.getProductType,
    },
    openUnAuthAlert,
  )
}
