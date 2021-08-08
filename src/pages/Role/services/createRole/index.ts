import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { CreateRoleModel } from './model'

const url = 'role'

export function createRole(data: CreateRoleModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<CreateRoleModel>>({
    config: {
      url,
      method: 'post',
      data,
    },
    name: apiKey.crateRole,
  })
}
