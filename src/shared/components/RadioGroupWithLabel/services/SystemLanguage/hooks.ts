import apiKey from 'src/core/services/base/apiKey'
import { useQuery } from 'react-query'
import { getSysLanguage as getSysLanguage } from '.'
import { SysParam } from './model'

export default function useSysLanguage(sysParam: SysParam, unAuthAlert: () => void) {
  const { code_type, open_flag, code_no } = sysParam
  const FetchFunction = () => getSysLanguage({ code_type, open_flag, code_no }, unAuthAlert)
  const { data, isFetchedAfterMount } = useQuery([apiKey.sysLanguage, code_type, open_flag], FetchFunction, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
  })

  return { response: data, isListFetched: isFetchedAfterMount }
}
