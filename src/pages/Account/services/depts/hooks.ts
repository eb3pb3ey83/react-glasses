import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getDeptList } from '.'

export default function useDept(openUnAuthAlert: () => void) {
  const { data, isFetched } = useQuery(apiKey.dept, () => getDeptList(openUnAuthAlert), {
    keepPreviousData: false,
  })

  return { deptResponse: data, isDeptFetched: isFetched }
}
