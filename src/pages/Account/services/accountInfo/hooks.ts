import React from 'react'
import { useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getAccountInfo } from '.'
export default function useAccountInfo(id: string, openUnAuthAlert: () => void) {
  const queryClient = useQueryClient()

  const { data } = useNoCacheQuery([apiKey.accountInfo, id], () => getAccountInfo({ id }, openUnAuthAlert), {
    cacheTime: 0,
  })

  React.useEffect(() => {
    queryClient.invalidateQueries(apiKey.accountInfo)
  }, [id])

  return { accountInfo: data?.data.result_data, isAccountInfoFetched: !!data }
}
