import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getMainBannerInfo } from '.'

export default function useMainBannerInfo(id: string) {
  const { data, isSuccess } = useQuery([apiKey.getMainBannerInfo, id], () => getMainBannerInfo({ id }), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  return { response: data?.data.result_data, isSuccess }
}
