import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { RoleInfoReponseModel, RoleInfoRequestModel } from './model'

const url = 'role'

export function getRoleInfo(params: RoleInfoRequestModel): Promise<AxiosResponse<RoleInfoReponseModel>> {
  return getService<RoleInfoReponseModel, ApiConfig<RoleInfoRequestModel>>({
    config: {
      url: `${url}/${params.id}`,
      method: 'get',
    },
    name: apiKey.roleInfo,
  })
}
