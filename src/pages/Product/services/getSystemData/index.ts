import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { SysDataObject, SysParam } from './model'

const url = 'sysdata/sys_code'

export function getSystemData(sysParam: SysParam, unAuthAlert: () => void): Promise<AxiosResponse<SysDataObject>> {
  return getService(
    {
      config: {
        url,
        method: 'get',
        params: sysParam,
      },
      name: apiKey.systemData,
      withAccessToken: true,
    },
    unAuthAlert,
  )
}
