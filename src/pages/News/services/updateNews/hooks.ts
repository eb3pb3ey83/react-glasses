import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { updateNews } from '.'
import { newsData as NDM } from './model'

export const useUpdateNews = (openUnAuthAlert: () => void, openToast: (message: string) => void, closeDrawer: (type?: string) => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, unknown, { newsData: NDM; id: string }, unknown>(({ newsData, id }) => updateNews(newsData, id, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section5'))
      queryClient.invalidateQueries(apiKey.news)
      queryClient.invalidateQueries(apiKey.getNewsInfo)
      closeDrawer('submit')
    },
  })
}
