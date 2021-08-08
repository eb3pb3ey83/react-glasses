import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getDealer } from '.'
import { dealerParms } from './model'

export default function useGetDealer(openUnAuthAlert: () => void, params: dealerParms, tabId: number) {
  const { company_model, order_by, open_flag, page, page_size, company_name, parent_id } = params
  const FetchFunction = () => getDealer(params, openUnAuthAlert)

  const { data, isSuccess, isLoading, error } = useQuery(
    [apiKey.getDealer, company_model, order_by, open_flag, page, page_size, company_name, parent_id],
    FetchFunction,
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 3,
      enabled: tabId === 2,
    },
  )

  return { response: data, isSuccess, isLoading, error }
}
