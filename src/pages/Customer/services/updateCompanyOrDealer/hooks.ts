import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { createCompanyOrDealer } from '.'
import { UpdateCompanyOrDealerModel } from './model'

export const useUpdateCompanyOrDealer = (openToast?: ({ message, error }: { message: string[]; error: boolean[] }) => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, unknown, UpdateCompanyOrDealerModel, unknown>((data: UpdateCompanyOrDealerModel) => createCompanyOrDealer(data), {
    onSuccess: () => {
      openToast && openToast({ message: t('company.dealerUpdateSuccess'), error: [false] })
      queryClient.invalidateQueries(apiKey.getCompanyDetail)
      queryClient.invalidateQueries(apiKey.getCustomer)
    },
  })
}
