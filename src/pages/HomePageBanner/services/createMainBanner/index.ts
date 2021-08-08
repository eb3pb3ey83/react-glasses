import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { createMainBannerRequest, CreateParams } from './model'
const url = '/banner/data'

export function createMainBanner(data: createMainBannerRequest[], params: CreateParams): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<createMainBannerRequest>>({
    config: {
      url,
      method: 'post',
      data,
      params,
    },
    name: apiKey.createMainBanner,
  })
}
