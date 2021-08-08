import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { Errors } from 'src/core/services/base/handleFailure/model'
import { createCompanyOrDealer } from '.'
import { CreateCompanyOrDealerModel } from './model'

interface HookModel {
  openToast?: ({ message, error }: { message: string[]; error: boolean[] }) => void
  setIsToastError?: React.Dispatch<React.SetStateAction<boolean>>
  isDealer?: boolean
  setIsEmailErr?: React.Dispatch<React.SetStateAction<boolean>>
  closeDrawer?: () => void
}

export const useCreateCompanyOrDealer = ({ openToast, setIsEmailErr, isDealer, closeDrawer }: HookModel) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, Errors, CreateCompanyOrDealerModel, unknown>((data: CreateCompanyOrDealerModel) => createCompanyOrDealer(data), {
    onSuccess: () => {
      if (!openToast) return
      isDealer
        ? openToast({ message: t('company.dealerCreateSuccess'), error: [false] })
        : openToast({ message: [t('company.createSuccess'), t('company.sendEmailSuccess')], error: [false, false] })
      isDealer ? queryClient.invalidateQueries(apiKey.getDealer) : queryClient.invalidateQueries(apiKey.getCompany)
      closeDrawer && closeDrawer()
    },
    onError: (error) => {
      if (error.response.status === 400) {
        setIsEmailErr && setIsEmailErr(true)
      }
    },
  })
}
