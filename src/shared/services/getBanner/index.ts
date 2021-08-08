import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { BannerRequestModel, BannerResponseModel } from './model'

const url = 'banner/data'

export function getBanner(params: BannerRequestModel, language?: string): Promise<AxiosResponse<BannerResponseModel>> {
  return getService<BannerResponseModel, ApiConfig<BannerRequestModel>>({
    config: {
      url,
      method: 'get',
      headers: {
        'Accept-language': language ? language : 'en-US',
      },
      params: {
        country_type: params.country_type,
        ban_type: params.ban_type,
        open_flag: params.open_flag,
      },
    },
    name: apiKey.getBanner,
  })
}
