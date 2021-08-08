import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { SettingRequestModel, SettingResponseModel } from './model'

const url = 'product/type/setting'

export function getProductSetting(params: SettingRequestModel, openUnAuthAlert?: () => void): Promise<AxiosResponse<SettingResponseModel>> {
  return getService<SettingResponseModel, ApiConfig<SettingRequestModel>>(
    {
      config: {
        url,
        method: 'get',
        params,
      },
      name: apiKey.getProductSetting,
    },
    openUnAuthAlert,
  )
}
