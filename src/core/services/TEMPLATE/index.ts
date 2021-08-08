import getService from '../base'
import apiKey from '../base/apiKey'
import { SheetModel } from '../googleSpreadsheetToJson/model'
const url = 'account/auth/logout'

export function logout(): Promise<unknown> {
  return getService<SheetModel>({
    config: {
      url,
      method: 'get',
    },
    name: apiKey.louout,
  })
}
