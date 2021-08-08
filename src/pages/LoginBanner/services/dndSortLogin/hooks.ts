import { useMutation } from 'react-query'
// import apiKey from 'src/core/services/base/apiKey'
import { dndSortLoginPageBanner } from '.'
import { SortLoginPageBannerModel } from './model'
export default function useDndSortLoginPageBanner() {
  // const queryClient = useQueryClient()

  return useMutation<unknown, unknown, SortLoginPageBannerModel, unknown>(dndSortLoginPageBanner, {
    onSuccess: () => {
      // queryClient.invalidateQueries(apiKey.getBanner)
    },
  })
}
