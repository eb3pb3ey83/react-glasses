import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { AlertModel } from 'src/shared/machine/alertMachine/model'
import { createBanner } from '.'
import { CreateBannerModel } from './model'
export default function useCreatingBanner(
  openToast: (message: string) => void,
  openAlert: (message: AlertModel) => void,
  closeAlert: () => void,
  closeDrawer: () => void,
) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, { data: { return_code: string } }, CreateBannerModel, unknown>(createBanner, {
    onSuccess: () => {
      openToast(t('toast.section10'))
      queryClient.invalidateQueries(apiKey.getBanner)
      closeDrawer()
    },
    onError: (error) => {
      if (error.data.return_code === 'BANNER_EXCEED') {
        openAlert({
          title: t('alert.section7'),
          content: t('alert.section8'),
          isDicidedMode: true,
          onConfirm: () => {
            closeAlert()
          },
        })
      }
    },
  })
}
