import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { ProductListReq, ProductListResponse } from './model'

const url = 'product'

export function getProductList(params: ProductListReq, openUnAuthAlert?: () => void): Promise<AxiosResponse<ProductListResponse>> {
  return getService<ProductListResponse, ApiConfig<ProductListReq>>(
    {
      config: {
        url,
        method: 'get',
        params,
      },
      name: apiKey.getProductList,
    },
    openUnAuthAlert,
  )
}
