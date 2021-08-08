import { getMenuList } from '.'
import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from '../base/hooks'

export default function useGetMenuList(unAuthAlert: () => void) {
  return useNoCacheQuery(apiKey.getMenuList, () => getMenuList(unAuthAlert))
}
