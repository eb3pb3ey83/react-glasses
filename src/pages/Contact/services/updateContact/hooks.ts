import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { updateContact } from '.'
import { UpdateContactModel } from './model'
export default function useUpdateContact(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, UpdateContactModel, unknown>((parm) => updateContact(parm, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section17'))
      queryClient.invalidateQueries(apiKey.getContact)
      closeDrawer()
    },
  })
}
