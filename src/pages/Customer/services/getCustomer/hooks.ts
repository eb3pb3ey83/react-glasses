import { AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getCustomer } from '.'
import { customerReqProps, CustomerResProps } from './model'

export default function useGetCustomer(
  openUnAuthAlert: () => void,
  params: customerReqProps,
  tabId?: number,
  isLastPage = false,
  customOptions?: UseQueryOptions<AxiosResponse<CustomerResProps>>,
) {
  const { open_flag, customer_id, role_type, order_by, page, page_size, filter, user_name } = params
  const FetchFunction = () => getCustomer(params, openUnAuthAlert)

  const { data, isSuccess, isLoading, isError } = useQuery(
    [apiKey.getCustomer, customer_id, role_type, order_by, page, page_size, open_flag, filter, user_name],
    FetchFunction,
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 3,
      enabled: tabId === 1 && !isLastPage,
      cacheTime: 0,
      ...customOptions,
    },
  )

  return { response: data, isSuccess, isLoading, isError }
}

export function useGetCustomerOptions(openUnAuthAlert: () => void, params: customerReqProps) {
  const { response, isError } = useGetCustomer(openUnAuthAlert, params, 1, false, { retry: 0 })
  const data = response?.data.result_data.data

  const selectorOptions = !data
    ? []
    : data.map(({ user_name_ch, job_title, user_id }) => ({
        label: `${user_name_ch} - ${job_title}`,
        value: user_id,
      }))

  return { selectorOptions, isFetched: !!response || isError }
}
