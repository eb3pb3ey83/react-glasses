import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getBanner } from 'src/shared/services/getBanner'
export default function useLoginBanner() {
  const ban_type = '1'
  const open_flag = '1'
  const FetchFunction = () => getBanner({ ban_type, open_flag })
  const { data, isFetched } = useNoCacheQuery([apiKey.getBanner, ban_type, open_flag], FetchFunction)

  return { response: data, isFetched }
}
