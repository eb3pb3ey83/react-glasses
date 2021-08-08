import getService from '../base'
import apiKey from '../base/apiKey'
const url = 'account/auth/logout'

export function logout(): Promise<unknown> {
  return getService({
    config: {
      url,
      method: 'get',
    },
    name: apiKey.louout,
  })
}
