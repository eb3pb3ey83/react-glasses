import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { DeleteBannerModel } from './model'

const url = 'banner/data'

export function deleteBanner(data: DeleteBannerModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<DeleteBannerModel>>({
    config: {
      url: `${url}/${data.id}`,
      method: 'delete',
      data,
    },
    name: apiKey.deleteBannerInfo,
  })
}
