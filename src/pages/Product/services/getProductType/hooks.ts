import { useContext } from 'react'
import { useQuery } from 'react-query'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { AlertUnauthContext } from 'src/pages/model'
import { getProductType } from '.'
import { ProductTypeReq } from './model'

export default function useGetProductType<T>(params?: ProductTypeReq) {
  const { language } = useLanguage()
  const type_id = params?.type_id
  const openUnAuthAlert = useContext(AlertUnauthContext)
  const FetchFunction = () => getProductType<T>(params, language, openUnAuthAlert)

  const { data, isLoading } = useQuery([apiKey.getProductType, language, type_id], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    // enabled: !!type_id || !!parent_id,
  })

  return { data, isLoading }
}
