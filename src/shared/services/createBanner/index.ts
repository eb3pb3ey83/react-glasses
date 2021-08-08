import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { CreateBannerModel } from './model'

const url = 'banner/data'

export function createBanner(data: CreateBannerModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<CreateBannerModel>>({
    config: {
      url: `${url}?ban_type=${data.ban_type}`,
      method: 'post',
      data: data.data,
    },
    name: apiKey.crateRole,
  })
}
