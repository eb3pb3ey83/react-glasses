import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getBannerInfo } from '.'
export default function useBannerInfo(id: string) {
  const { data, isFetching } = useQuery([apiKey.getbannerInfo, id], () => getBannerInfo({ id }), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 0,
    retry: 3,
  })

  return { bannerInfo: data?.data.result_data, isBannerInfoFetched: !isFetching && Boolean(data) }
}
