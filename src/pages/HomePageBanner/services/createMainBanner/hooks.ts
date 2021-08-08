import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { AlertModel } from 'src/shared/machine/alertMachine/model'
import { createMainBanner } from '.'
import { createMainBannerRequest, CreateParams } from './model'

export const useCreateMainBanner = (
  openToast: (message: string) => void,
  openAlert: (message: AlertModel) => void,
  closeAlert: () => void,
  closeDrawer: () => void,
) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, { data: { return_code: string } }, { data: createMainBannerRequest[]; params: CreateParams }, unknown>(
    ({ data, params }) => createMainBanner(data, params),
    {
      onSuccess: () => {
        openToast(t('toast.section12'))
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
    },
  )
}
