import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { CreateCompanyOrDealerModel } from './model'
const url = 'company'

export function createCompanyOrDealer(data: CreateCompanyOrDealerModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<CreateCompanyOrDealerModel>>({
    config: {
      url: `${url}`,
      method: 'post',
      data,
    },
    name: apiKey.createCompanyOrDealer,
  })
}
