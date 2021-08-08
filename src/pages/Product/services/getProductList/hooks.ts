import { useContext } from 'react'
import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { AlertUnauthContext } from 'src/pages/model'
import { getProductList } from '.'
import { ProductListReq } from './model'

export default function useGetProductList(params: ProductListReq) {
  const { country_type, type_id } = params
  const openUnAuthAlert = useContext(AlertUnauthContext)
  const FetchFunction = () => getProductList(params, openUnAuthAlert)

  const { data, isLoading } = useQuery([apiKey.getProductList, country_type, type_id], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    enabled: !!country_type && !!type_id,
  })

  return { data, isLoading }
}
