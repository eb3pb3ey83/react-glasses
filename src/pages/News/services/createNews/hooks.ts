import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { createNews } from '.'
import { newsData } from './model'

export const useCreateNews = (openUnAuthAlert: () => void, openToast: (message: string) => void, closeDrawer: (type?: string) => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, newsData, unknown>((parms) => createNews(parms, openUnAuthAlert), {
    onSuccess: () => {
      openToast(t('toast.section3'))
      queryClient.invalidateQueries(apiKey.news)
      closeDrawer('submit')
    },
  })
}
