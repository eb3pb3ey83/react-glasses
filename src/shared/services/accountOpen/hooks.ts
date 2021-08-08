import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { sendOpenAccountEmail } from '.'
import apiKey from 'src/core/services/base/apiKey'
export default function useSendOpeningAccount(
  email: string | undefined,
  shouldSend: boolean,
  setShouldSendMail: React.Dispatch<React.SetStateAction<boolean>>,
  openToast?: ({ message, error }: { message: string[]; error: boolean[] }) => void,
  closeDrawer?: () => void,
) {
  const { t } = useTranslation()

  useQuery([apiKey.sendOpenAccountEmail, email, shouldSend], () => sendOpenAccountEmail({ email }), {
    onSuccess: () => {
      setShouldSendMail(false)
      closeDrawer && closeDrawer()
      openToast && openToast({ message: [t('toast.sendVerifyEmail')], error: [false] })
    },
    onError: () => {
      setShouldSendMail(false)
      openToast && openToast({ message: [t('toast.sendVerifyEmailError')], error: [true] })
    },
    enabled: shouldSend && !!email,
    retry: 0,
  })
  return null
}
