import apiKey from 'src/core/services/base/apiKey'
import { useQuery } from 'react-query'
import { getSystemData } from '.'
import { useContext } from 'react'
import { AlertUnauthContext } from 'src/pages/model'

export function useGetPackageUnit() {
  const unAuthAlert = useContext(AlertUnauthContext)
  const systemParams = {
    code_type: 'PU',
    open_flag: '1',
  }
  const FetchFunction = () => getSystemData(systemParams, unAuthAlert)
  const { data } = useQuery([apiKey.systemData, systemParams.code_type, systemParams.open_flag], FetchFunction, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  return { data }
}

export function useGetBrand() {
  const unAuthAlert = useContext(AlertUnauthContext)
  const systemParams = {
    code_type: 'BN',
    open_flag: '1',
  }
  const FetchFunction = () => getSystemData(systemParams, unAuthAlert)
  const { data } = useQuery([apiKey.systemData, systemParams.code_type, systemParams.open_flag], FetchFunction, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  return { data }
}
