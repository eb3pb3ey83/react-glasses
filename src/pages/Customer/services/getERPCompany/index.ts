import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { ERPRequestModel, ERPResponseModel } from './model'

const url = 'company/erp'

export function getERPCompany(params: ERPRequestModel): Promise<AxiosResponse<ERPResponseModel>> {
  return getService<ERPResponseModel>({
    config: {
      url,
      method: 'get',
      params,
    },
    name: apiKey.getERPCompany,
  })
}
