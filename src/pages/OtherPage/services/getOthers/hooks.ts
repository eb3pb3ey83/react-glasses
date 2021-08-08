import { useQuery } from 'react-query'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { getOthers } from '.'
import { otherParms } from './model'

export default function useGetOthers(params: otherParms) {
  const { language } = useLanguage()
  const { country_type, open_flag, page, page_size } = params
  const FetchFunction = () => getOthers(params, language)

  const { data, isSuccess, isLoading } = useQuery([apiKey.getOthers, country_type, open_flag, page, page_size, language], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    enabled: !!country_type,
  })

  return { response: data, isSuccess, isLoading }
}
