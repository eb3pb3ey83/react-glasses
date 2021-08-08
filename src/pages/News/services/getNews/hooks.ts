import { useQuery } from 'react-query'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { getNewsList } from '.'
import { newsParamsProps } from './model'

export default function useGetNews(params: newsParamsProps, openUnAuthAlert: () => void) {
  const { language } = useLanguage()
  const { publicStatus, country_type, open_flag, currentPage: page, keyword, order, page_size } = params
  const FetchFunction = () =>
    getNewsList(
      openUnAuthAlert,
      publicStatus === '0'
        ? { country_type, open_flag, page, keyword, order, page_size }
        : { country_type, open_flag, page, keyword, order, page_size, public: publicStatus === '1' ? true : false },
      language,
    )

  const { data, isSuccess, isLoading } = useQuery(
    [apiKey.news, country_type, open_flag, page, keyword, order, page_size, publicStatus, language],
    FetchFunction,
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 3,
      enabled: !!country_type,
    },
  )

  return { response: data, isSuccess, isLoading }
}
