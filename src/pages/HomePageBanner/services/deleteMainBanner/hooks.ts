import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { deleteMainBanner } from '.'
import { deleteMainBannerRequest } from './model'

export const deleteEditMainBanner = (openToast: (message: string) => void, closeDrawer: () => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, unknown, { data: deleteMainBannerRequest; id: string }, unknown>(({ data, id }) => deleteMainBanner(data, id), {
    onSuccess: () => {
      openToast(t('toast.section1'))
      queryClient.invalidateQueries(apiKey.getBanner)
      closeDrawer()
    },
  })
}
