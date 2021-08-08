import { useMutation } from 'react-query'
// import apiKey from 'src/core/services/base/apiKey'
import { dndSortHomePageBanner } from '.'
import { SortHomePageBannerModel } from './model'
export default function useDndSortHomePageBanner() {
  // const queryClient = useQueryClient()

  return useMutation<unknown, unknown, SortHomePageBannerModel, unknown>(dndSortHomePageBanner, {
    onSuccess: () => {
      // queryClient.invalidateQueries(apiKey.getBanner)
    },
  })
}
