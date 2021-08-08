import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { editMainBannerRequest } from './model'
const url = '/banner/data'

export function editMainBanner(data: editMainBannerRequest[], id: string): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<editMainBannerRequest>>({
    config: {
      url: `${url}/${id}`,
      method: 'patch',
      data,
    },
    name: apiKey.editMainBanner,
  })
}
