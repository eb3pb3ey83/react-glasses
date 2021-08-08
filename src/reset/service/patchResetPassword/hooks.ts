import { useMutation } from 'react-query'
import { patchResetPassword } from 'src/reset/service/patchResetPassword'
import { sendEventType } from 'src/shared/components/ResetPassword'
import { TokenModel } from './model'

export default function useResetPassword(send: sendEventType, openUnAuthAlert: () => void) {
  return useMutation<unknown, unknown, TokenModel, unknown>((parm) => patchResetPassword(parm, openUnAuthAlert), {
    onSuccess: () => {
      send({ type: 'RESET_SUCCESS' })
    },
  })
}
