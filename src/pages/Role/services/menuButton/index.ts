import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { MenusButtonResponse } from './model'

const url = 'menus/menus_buttons'

export function getMenuButton(): Promise<AxiosResponse<MenusButtonResponse>> {
  return getService<MenusButtonResponse>({
    config: {
      url,
      method: 'get',
    },
    name: apiKey.menuButton,
  })
}
