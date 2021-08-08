import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { customParms, customResProps } from './model'

const url = 'company'

export function getCompany(params: customParms, openUnAuthAlert: () => void): Promise<AxiosResponse<customResProps>> {
  return getService<customResProps, ApiConfig<customParms>>(
    {
      config: {
        url,
        method: 'get',
        params,
      },
      name: apiKey.getCompany,
    },
    openUnAuthAlert,
  )
}
