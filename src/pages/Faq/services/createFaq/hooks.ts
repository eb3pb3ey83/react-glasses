import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { createFaq } from '.'
import { CreateFaqModel } from './model'
export default function useCreateFaq(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, CreateFaqModel, unknown>((parm) => createFaq(parm, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section18'))
      queryClient.invalidateQueries(apiKey.getFaqList)
      closeDrawer()
    },
  })
}
