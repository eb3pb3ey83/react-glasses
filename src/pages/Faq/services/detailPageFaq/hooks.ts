import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'

import { detailPageFaq } from '.'

export default function useDetailPageFaq(id: string | undefined, openUnAuthAlert: () => void) {
  const { data, isFetching } = useQuery([apiKey.detailPageFaq, id], () => detailPageFaq({ id }, openUnAuthAlert), {
    enabled: id !== 'create' && id !== undefined,
  })

  return { detailPageFaq: data?.data.result_data, isdetailPageFaqFetched: !isFetching && Boolean(data) }
}
