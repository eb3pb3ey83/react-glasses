import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { SortHomePageBannerModel } from './model'

const url = 'banner/order'

export function dndSortHomePageBanner(data: SortHomePageBannerModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<SortHomePageBannerModel>>({
    config: {
      url,
      method: 'patch',
      data,
    },
    name: apiKey.sortHomeBanner,
  })
}
