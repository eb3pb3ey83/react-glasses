import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getRoleList } from '.'
import Context from '../../machineConfig/context'
export default function useRole(context: Context, openUnAuthAlert: () => void) {
  const { currentPage: page } = context
  const FetchFunction = () => getRoleList({ page }, openUnAuthAlert)

  const { data, isFetched } = useQuery([apiKey.role, page], FetchFunction, {
    keepPreviousData: false,
  })

  return { roleResponse: data, isRoleFetched: isFetched }
}
