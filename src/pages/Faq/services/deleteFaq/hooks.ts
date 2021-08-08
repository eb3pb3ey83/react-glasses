import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { deleteFaq } from '.'
import { DeleteFaqModel } from './model'
export default function useDeletingFaq(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, DeleteFaqModel, unknown>((parm) => deleteFaq(parm, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section19'))
      queryClient.invalidateQueries(apiKey.getFaqList)
      closeDrawer()
    },
  })
}
