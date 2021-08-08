import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getCompany } from '.'
import { customParms } from './model'

export default function useGetCompany(params: customParms, openUnAuthAlert: () => void) {
  const { company_model, order_by, country_type, open_flag, page, page_size, company_name } = params
  const FetchFunction = () => getCompany(params, openUnAuthAlert)

  const { data, isSuccess, isLoading, error } = useQuery(
    [apiKey.getCompany, company_model, order_by, country_type, open_flag, page, page_size, company_name],
    FetchFunction,
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 3,
      // enabled: !!country_type,
    },
  )

  return { response: data, isSuccess, isLoading, error }
}
