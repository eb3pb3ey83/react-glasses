import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { dataObject } from 'src/shared/types/data.type'

const url = 'account/auth/login'

export interface LoginModel {
  email: string
  password: string
}

export function login({ email, password }: LoginModel): Promise<AxiosResponse<dataObject>> {
  return getService({
    config: {
      url,
      method: 'post',
      data: { email, password },
    },
    name: apiKey.login,
    withAccessToken: false,
  })
}
