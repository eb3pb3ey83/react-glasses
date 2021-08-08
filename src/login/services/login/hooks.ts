import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { dataObject } from 'src/shared/types/data.type'
import authConfig from 'src/utils/authConfig'
import { login, LoginModel } from '.'

export default function useLogin() {
  return useMutation<AxiosResponse<dataObject>, unknown, LoginModel, unknown>(login, {
    onSuccess: (response) => {
      const data = response.data.result_data as dataObject
      const permissions = data.premissions as string[]
      const userData = data.authenticatedUser as dataObject
      const permissionList = JSON.stringify(permissions)

      window.localStorage.setItem('isLogin', 'true')
      window.localStorage.setItem('permissions', permissionList)
      window.localStorage.setItem('authenticatedUser', JSON.stringify(userData))

      authConfig.setAccessToken(data.access_token as string)
      location.href = '/'
    },
  })
}
