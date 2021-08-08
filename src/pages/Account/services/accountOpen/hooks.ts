import { useTranslation } from 'react-i18next'
import { SendAcountEmailModel } from './model'
import { useMutation } from 'react-query'
import { sendOpenAccountEmail } from '.'
import { AlertModel } from '../../components/AccountEditor/machineConfig/model'
export default function useOpeningAccount(openAlert: (message: AlertModel) => void, openUnAuthAlert: () => void) {
  const { t } = useTranslation()

  return useMutation<unknown, unknown, SendAcountEmailModel, unknown>((parm) => sendOpenAccountEmail(parm, openUnAuthAlert), {
    onSuccess: () => {
      openAlert({ title: t('alert.section3'), content: t('alert.section23'), isDicidedMode: false })
    },
  })
}
