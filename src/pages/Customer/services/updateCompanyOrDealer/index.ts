import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { UpdateCompanyOrDealerModel } from './model'
const url = '/company'

export function createCompanyOrDealer(data: UpdateCompanyOrDealerModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<UpdateCompanyOrDealerModel>>({
    config: {
      url: `${url}`,
      method: 'patch',
      data,
    },
    name: apiKey.createCompanyOrDealer,
  })
}
