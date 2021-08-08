import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { BannerInfoRequestModel, BannerInfoResponseModel } from './model'

const url = 'banner/data'

export function getBannerInfo(params: BannerInfoRequestModel): Promise<AxiosResponse<BannerInfoResponseModel>> {
  return getService<BannerInfoResponseModel, ApiConfig<BannerInfoRequestModel>>({
    config: {
      url: `${url}/${params.id}`,
      method: 'get',
    },
    name: apiKey.getbannerInfo,
  })
}
