import { useQuery } from 'react-query'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { getCustomerPermission } from '.'
import { ReqProps } from './model'

export default function useGetCustomerPermission(params: ReqProps) {
  const { language } = useLanguage()
  const { data_type, company_model, role_type, user_id } = params
  const FetchFunction = () => getCustomerPermission(params, language)

  const { data, isSuccess, isLoading } = useQuery(
    [apiKey.getCustomerPermission, data_type, company_model, role_type, user_id, language],
    FetchFunction,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 3,
      enabled: !!role_type,
    },
  )

  return { response: data, isSuccess, isLoading }
}
