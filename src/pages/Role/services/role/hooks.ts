import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getRoleList } from '.'
import Context from '../../machineConfig/context'
export default function useRole(context: Context) {
  const { currentPage: page, keyword, order_by, role_type, page_size } = context
  const FetchFunction = () => getRoleList({ page, keyword, order_by, role_type, page_size })

  const { data, isFetchedAfterMount } = useQuery([apiKey.role, page, keyword, order_by, role_type, page_size], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    // refetchOnMount: true,
    retry: 3,
  })

  return { response: data, isRoleListFetched: isFetchedAfterMount }
}
