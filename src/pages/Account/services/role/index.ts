import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import predicator from 'src/utils/predicator'
import { RoleList, RoleResquestModel } from './model'

const url = 'role'

export function getRoleList(params: RoleResquestModel, openUnAuthAlert: () => void): Promise<AxiosResponse<RoleList>> {
  return getService<RoleList, ApiConfig<RoleResquestModel>>(
    {
      config: {
        url,
        method: 'get',
        params: predicator(params),
      },
      name: apiKey.role,
    },
    openUnAuthAlert,
  )
}
