import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getMenuButton } from '.'
export default function useMenuButton() {
  const { data, isFetched } = useQuery([apiKey.menuButton], getMenuButton, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  return { data, isMenuInfoFetched: isFetched }
}
