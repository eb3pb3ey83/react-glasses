import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getNewsInfo } from '.'

export default function useNewsInfo({ open_flag, id }: { open_flag: '0' | '1'; id: string }, openUnAuthAlert: () => void) {
  const fetchFunction = () => getNewsInfo({ id, open_flag }, openUnAuthAlert)
  const { data, isSuccess } = useNoCacheQuery([apiKey.getNewsInfo, open_flag, id], fetchFunction)

  return { newsInfo: data?.data.result_data, isSuccess }
}
