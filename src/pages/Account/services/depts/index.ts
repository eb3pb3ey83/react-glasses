import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { DeptsList } from './model'

const url = 'department/list'

export function getDeptList(openUnAuthAlert: () => void): Promise<AxiosResponse<DeptsList>> {
  return getService<DeptsList>(
    {
      config: {
        url,
        method: 'get',
      },
      name: apiKey.dept,
    },
    openUnAuthAlert,
  )
}
