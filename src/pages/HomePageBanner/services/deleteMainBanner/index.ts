import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { deleteMainBannerRequest } from './model'
const url = '/banner/data'

export function deleteMainBanner(data: deleteMainBannerRequest, id: string): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<deleteMainBannerRequest>>({
    config: {
      url: `${url}/${id}`,
      method: 'delete',
      data,
    },
    name: apiKey.deleteBannerInfo,
  })
}
