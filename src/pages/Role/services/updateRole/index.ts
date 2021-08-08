import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { UpdateRoleModel } from './model'

const url = 'role'

export function updateRole(data: UpdateRoleModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<UpdateRoleModel>>({
    config: {
      url: `${url}/${data.id}`,
      method: 'patch',
      data: data.updateData,
    },
    name: apiKey.updateRole,
  })
}
