import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { detailPageContact } from '.'

export default function useDetailPageContact(id: string, openUnAuthAlert: () => void) {
  const { data } = useQuery([apiKey.detailPageFaq, id], () => detailPageContact({ contact_id: id }, openUnAuthAlert), {
    enabled: !!id && id !== 'create',
  })

  return { detailPageContact: data?.data.result_data, isdetailPageContactFetched: Boolean(data) }
}
