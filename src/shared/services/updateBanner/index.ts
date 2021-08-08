import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { UpdateBannerModel } from './model'

const url = 'banner/data'

export function updateBanner(data: UpdateBannerModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<UpdateBannerModel>>({
    config: {
      url: `${url}/${data.id}`,
      method: 'patch',
      data: data.data,
    },
    name: apiKey.updateBannerInfo,
  })
}
