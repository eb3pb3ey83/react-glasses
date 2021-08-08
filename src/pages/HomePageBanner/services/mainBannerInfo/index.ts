import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { mainBannerInfoRequestModel, mainBannerInfoResponseModel } from './model'

const url = '/banner/data'

export function getMainBannerInfo(params: mainBannerInfoRequestModel): Promise<AxiosResponse<mainBannerInfoResponseModel>> {
  return getService<mainBannerInfoResponseModel, ApiConfig<mainBannerInfoRequestModel>>({
    config: {
      url: `${url}/${params.id}`,
      method: 'get',
    },
    name: apiKey.getMainBannerInfo,
  })
}
