import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { dealerParms, dealerResProps } from './model'

const url = 'company'

export function getDealer(params: dealerParms, openUnAuthAlert: () => void): Promise<AxiosResponse<dealerResProps>> {
  return getService<dealerResProps, ApiConfig<dealerParms>>(
    {
      config: {
        url,
        method: 'get',
        params,
      },
      name: apiKey.getDealer,
    },
    openUnAuthAlert,
  )
}
