import { useContext } from 'react'
import { useQuery } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { AlertUnauthContext } from 'src/pages/model'
import { getProductSetting } from '.'
import { SettingRequestModel } from './model'

export default function useGetProductSetting(params: SettingRequestModel) {
  const { type_id } = params
  const openUnAuthAlert = useContext(AlertUnauthContext)
  const FetchFunction = () => getProductSetting(params, openUnAuthAlert)

  const { data, isLoading } = useQuery([apiKey.getProductSetting, type_id], FetchFunction, {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  return { data, isLoading }
}
