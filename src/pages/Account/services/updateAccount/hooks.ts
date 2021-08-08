import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { updateAccount } from '.'
import { UpdateAccountModel } from './model'
export default function useUpdatingAccount(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, UpdateAccountModel, unknown>((parm) => updateAccount(parm, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section14'))
      queryClient.invalidateQueries(apiKey.account)
      queryClient.invalidateQueries(apiKey.getMenuList)
      closeDrawer()
    },
  })
}
