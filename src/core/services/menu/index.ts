import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { MenuResponse } from './model'

const url = 'menus'

export function getMenuList(unAuthAlert: () => void): Promise<AxiosResponse<MenuResponse>> {
  return getService(
    {
      config: {
        url,
        method: 'get',
      },
      name: apiKey.getMenuList,
      withAccessToken: true,
    },
    unAuthAlert,
  )
}
