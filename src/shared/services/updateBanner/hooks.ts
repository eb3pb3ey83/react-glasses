import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { updateBanner } from '.'
import { UpdateBannerModel } from './model'
export default function useUpdatingBanner(openToast: (message: string) => void, closeDrawer: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, UpdateBannerModel, unknown>(updateBanner, {
    onSuccess: () => {
      openToast(t('toast.section22'))
      queryClient.invalidateQueries(apiKey.getBanner)
      closeDrawer()
    },
  })
}
