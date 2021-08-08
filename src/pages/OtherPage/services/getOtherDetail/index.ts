import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { otherDetailParms, otherDetailListProps } from './model'

const url = '/relatedpages/detail'

export function getOhterDetail(params: otherDetailParms): Promise<AxiosResponse<otherDetailListProps>> {
  return getService<otherDetailListProps, ApiConfig<otherDetailParms>>({
    config: {
      url,
      method: 'get',
      params,
    },
    name: apiKey.getOtherDetail,
  })
}
