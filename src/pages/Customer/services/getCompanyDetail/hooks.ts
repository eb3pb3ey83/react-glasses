import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { getCompanyDetail } from '.'
import { CompanyDetailRequestModel } from './model'

export default function useGetCompanyDetail(params: CompanyDetailRequestModel, isCreate: boolean) {
  const { company_model, customer_id } = params
  const FetchFunction = () => getCompanyDetail(params)

  const { data, isSuccess, isLoading, error } = useQuery([apiKey.getCompany, company_model, customer_id], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    cacheTime: 0,
    enabled: !isCreate,
  })

  return { response: data, isSuccess, isLoading, error, isFetched: !!data }
}
