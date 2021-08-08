import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { ProductERPReq, ProductERPResponse } from './model'

const url = 'product/erp'

export function getProductErp(params: ProductERPReq, openUnAuthAlert?: () => void): Promise<AxiosResponse<ProductERPResponse>> {
  return getService<ProductERPResponse, ApiConfig<ProductERPReq>>(
    {
      config: {
        url,
        method: 'get',
        params,
      },
      name: apiKey.getProductERP,
    },
    openUnAuthAlert,
  )
}
