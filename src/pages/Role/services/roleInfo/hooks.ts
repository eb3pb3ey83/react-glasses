import React from 'react'
import { useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getRoleInfo } from '.'
export default function useRoleInfo(id: string) {
  const queryClient = useQueryClient()

  const { data, isFetchedAfterMount } = useNoCacheQuery([apiKey.roleInfo, id], () => getRoleInfo({ id }))

  React.useEffect(() => {
    queryClient.invalidateQueries(apiKey.roleInfo)
  }, [id])

  return { roleInfo: data?.data.result_data, isRoleInfoFetched: isFetchedAfterMount }
}
