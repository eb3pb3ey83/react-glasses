import { useQuery } from 'react-query'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { getCustomerDetail } from '.'

export default function useGetCustomerDetail(id?: string) {
  const { language } = useLanguage()
  const FetchFunction = () => getCustomerDetail(id, language)

  const { data, isSuccess, isLoading } = useQuery([apiKey.getCustomerDetal, id, language], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    enabled: !!id,
  })

  return { response: data, isSuccess, isLoading }
}
