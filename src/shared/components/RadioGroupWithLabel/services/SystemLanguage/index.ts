import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { SysLanguageObject, SysParam } from './model'

const url = 'sysdata/sys_code'

export function getSysLanguage(sysParam: SysParam, unAuthAlert: () => void): Promise<AxiosResponse<SysLanguageObject>> {
  return getService(
    {
      config: {
        url,
        method: 'get',
        params: sysParam,
      },
      name: apiKey.sysLanguage,
      withAccessToken: true,
    },
    unAuthAlert,
  )
}
