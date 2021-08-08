import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { editMainBanner } from '.'
import { editMainBannerRequest } from './model'

export const useEditMainBanner = (openToast: (message: string) => void, closeDrawer: () => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, unknown, { data: editMainBannerRequest[]; id: string }, unknown>(({ data, id }) => editMainBanner(data, id), {
    onSuccess: () => {
      openToast(t('toast.section2'))
      queryClient.invalidateQueries(apiKey.getBanner)
      queryClient.invalidateQueries(apiKey.getMainBannerInfo)
      closeDrawer()
    },
  })
}
