import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { customerReqProps, CustomerResProps } from './model'

const url = 'customer'

export function getCustomer(params: customerReqProps, openUnAuthAlert?: () => void): Promise<AxiosResponse<CustomerResProps>> {
  return getService<CustomerResProps, ApiConfig<customerReqProps>>(
    {
      config: {
        url,
        method: 'get',
        params,
      },
      name: apiKey.getOtherDetail,
    },
    openUnAuthAlert,
  )
}
