import { useMutation } from 'react-query'
import { EmailModel, postEmail } from 'src/shared/services/postEmail'
import { SendType } from 'src/shared/types/machine.type'
import Context from 'src/shared/components/ResetPassword/machineConfig/context'
import ResetEvent from 'src/shared/components/ResetPassword/machineConfig/event'
export default function useSendingEmail(send: SendType<Context, ResetEvent>, isResetPage?: boolean) {
  return useMutation<unknown, unknown, EmailModel, unknown>((parms) => postEmail(parms), {
    onSuccess: () => {
      isResetPage ? send({ type: 'RESET_PAGE_SEND' }) : send({ type: 'SEND' })
    },
  })
}
