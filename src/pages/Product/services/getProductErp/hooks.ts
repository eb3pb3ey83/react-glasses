import { useContext } from 'react'
import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { AlertUnauthContext } from 'src/pages/model'
import { getProductErp } from '.'
import { ProductERPReq } from './model'

export default function useGetProductERP(params: ProductERPReq) {
  const { filter, page, page_size } = params
  const openUnAuthAlert = useContext(AlertUnauthContext)
  const FetchFunction = () => getProductErp(params, openUnAuthAlert)

  const { data } = useQuery([apiKey.getProductERP, filter, page, page_size], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  const selectorOptions = !data?.data
    ? []
    : data?.data.result_data.map((value) => ({
        label: `${value.product_no} ${value.product_name}`,
        value: value.product_no,
      }))

  return { selectorOptions, isFetched: !!data }
}
