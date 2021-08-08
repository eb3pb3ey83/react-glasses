import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { deleteContact } from '.'
import { DeleteContactModel } from './model'
export default function useDeletingContact(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, DeleteContactModel, unknown>((parm) => deleteContact(parm, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section16'))
      queryClient.invalidateQueries(apiKey.getContact)
      closeDrawer()
    },
  })
}
