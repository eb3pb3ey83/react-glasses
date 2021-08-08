import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { createContact } from '.'
import { CreateContactModel } from './model'
export default function useCreateContact(openToast: (message: string) => void, closeDrawer: () => void, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, CreateContactModel, unknown>((par) => createContact(par, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section15'))
      queryClient.invalidateQueries(apiKey.getContact)
      closeDrawer()
    },
  })
}
