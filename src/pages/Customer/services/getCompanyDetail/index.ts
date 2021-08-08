import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { CompanyDetailRequestModel, CompanyDetailResponseModel } from './model'

const url = 'company/detail'

export function getCompanyDetail(params: CompanyDetailRequestModel): Promise<AxiosResponse<CompanyDetailResponseModel>> {
  return getService<CompanyDetailResponseModel, ApiConfig<CompanyDetailResponseModel>>({
    config: {
      url,
      method: 'get',
      params,
    },
    name: apiKey.getCompanyDetail,
  })
}
