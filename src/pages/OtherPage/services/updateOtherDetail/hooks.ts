import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { updateOhterDetail } from '.'
import { sectionsProps } from './model'

export const useUpdateOtherDetail = (openToast: (message: string) => void, closeDrawer: () => void) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  return useMutation<unknown, unknown, { data: sectionsProps[]; id: string; title?: string }, { data: sectionsProps[]; id: string; title?: string }>(
    ({ data, id }) => updateOhterDetail(data, id),
    {
      onSuccess: (_data, vr) => {
        let toastwords = t('toast.section21') + vr?.title
        const toastTrans = t('toast.section21').split(' ')
        if (toastTrans.length >= 2) {
          toastwords = t('toast.section21')
            .split(' ')
            .join(' ' + vr?.title + ' ')
        }
        openToast(toastwords)
        queryClient.invalidateQueries(apiKey.getOtherDetail)
        queryClient.invalidateQueries(apiKey.getOthers)
        closeDrawer()
      },
    },
  )
}
