import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { updateFaq } from '.'
import { UpdateFaqModel } from './model'
export default function useUpdateFaq(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, UpdateFaqModel, unknown>((parm) => updateFaq(parm, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section20'))
      queryClient.invalidateQueries(apiKey.getFaqList)
      closeDrawer()
    },
  })
}
