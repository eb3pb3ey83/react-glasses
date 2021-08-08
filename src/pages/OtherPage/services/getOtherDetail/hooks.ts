// import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getOhterDetail } from '.'
import { otherDetailParms } from './model'

export default function useGetOtherDetail({ open_flag, other_id }: otherDetailParms) {
  const FetchFunction = () => getOhterDetail({ open_flag, other_id })

  const { data, isSuccess, isLoading } = useNoCacheQuery([apiKey.getOtherDetail, other_id, open_flag], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  return { response: data, isSuccess, isLoading }
}
