import { useMutation } from 'react-query'
// import apiKey from 'src/core/services/base/apiKey'
import { dndSortFaq } from '.'
import { SortFaqModel } from './model'
export default function useDndSortFaq(openUnAuthAlert: () => void) {
  // const queryClient = useQueryClient()

  return useMutation<unknown, unknown, SortFaqModel, unknown>((parm) => dndSortFaq(parm, openUnAuthAlert), {
    onSuccess: () => {
      // queryClient.invalidateQueries(apiKey.getFaqList)
    },
  })
}
