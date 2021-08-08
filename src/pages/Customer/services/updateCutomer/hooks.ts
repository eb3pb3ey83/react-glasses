import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { Errors } from 'src/core/services/base/handleFailure/model'
import { updateCustomer } from '.'
import { ReqProps } from './model'

export const useUpdateCustomer = (closeDrawer?: () => void, openToast?: ({ message, error }: { message: string[]; error: boolean[] }) => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, Errors, ReqProps, unknown>(updateCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries(apiKey.getCustomerDetal)
      closeDrawer && closeDrawer()
      openToast && openToast({ message: [t('toast.companyAccountUpdateSuccess')], error: [false] })
      queryClient.invalidateQueries(apiKey.getCustomer)
    },
  })
}
