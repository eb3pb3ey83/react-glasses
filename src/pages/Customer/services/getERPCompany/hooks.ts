import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getERPCompany } from '.'
import { ERPRequestModel } from './model'

export default function useGetERPCompany(params: ERPRequestModel) {
  const { country_type, page, page_size, filter } = params
  const FetchFunction = () => getERPCompany(params)

  const { data } = useNoCacheQuery([apiKey.getCompany, filter, country_type, page, page_size], FetchFunction, {
    cacheTime: 0,
  })

  const selectorOptions = !data?.data
    ? []
    : data?.data.result_data.map((value) => ({
        label: `${value.company_no} ${value.company_name}`,
        value: value,
      }))

  return { selectorOptions, isFetched: !!data }
}
