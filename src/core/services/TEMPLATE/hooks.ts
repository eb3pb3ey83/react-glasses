import { useMutation } from 'react-query'
import authConfig from 'src/utils/authConfig'
import { logout } from '.'
import { TokenModel } from './model'

export default function useLogout() {
  return useMutation<unknown, unknown, TokenModel, unknown>(logout, {
    onSuccess: () => {
      authConfig.logOut()
    },
  })

  // return useQuery([...params], apiFunction, {
  // options
  // })
}
