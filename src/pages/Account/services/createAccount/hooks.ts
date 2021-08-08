import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { createAccount } from '.'
import { CreateAccountModel } from './model'
export default function useCreatingAccount(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, CreateAccountModel, unknown>((parm) => createAccount(parm, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section13'))
      queryClient.invalidateQueries(apiKey.account)
      closeDrawer()
    },
  })
}
