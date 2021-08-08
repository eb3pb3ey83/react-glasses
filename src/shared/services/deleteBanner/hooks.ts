import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { deleteBanner } from '.'
import { DeleteBannerModel } from './model'
export default function useDeletingBanner(openToast: (message: string) => void, closeDrawer: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, DeleteBannerModel, unknown>(deleteBanner, {
    onSuccess: () => {
      openToast(t('toast.section11'))
      queryClient.invalidateQueries(apiKey.getBanner)
      closeDrawer()
    },
  })
}
