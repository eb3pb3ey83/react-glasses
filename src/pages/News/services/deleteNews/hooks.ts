import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { deleteNews } from '.'
import { deleteProps } from './model'

export const useDeleteNews = (openUnAuthAlert: () => void, openToast: (message: string) => void, closeDrawer: () => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, unknown, deleteProps, unknown>((data) => deleteNews(data, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section4'))
      queryClient.invalidateQueries(apiKey.news)
      closeDrawer()
    },
  })
}
