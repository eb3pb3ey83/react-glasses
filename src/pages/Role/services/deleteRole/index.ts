import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { DeleteRoleModel } from './model'

const url = 'role'

export function deleteRole(data: DeleteRoleModel): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<DeleteRoleModel>>({
    config: {
      url: `${url}/${data.id}`,
      method: 'delete',
    },
    name: apiKey.deleteRole,
  })
}
