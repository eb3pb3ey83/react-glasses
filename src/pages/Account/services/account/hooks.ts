import { useQuery } from 'react-query'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { getAccountList } from '.'
import Context from '../../machineConfig/context'
export default function useAccount(context: Context, openUnAuthAlert: () => void) {
  const { language } = useLanguage()
  const { currentPage: page, user_name, order, roles, depts, open_flag } = context
  const FetchFunction = () =>
    getAccountList({ page, user_name, order, roles: roles.join(), depts: depts.join(), open_flag }, openUnAuthAlert, language)

  const { data, isFetchedAfterMount } = useQuery(
    [apiKey.account, page, user_name, order, roles.join(), depts.join(), open_flag, language],
    FetchFunction,
    {
      keepPreviousData: false,
    },
  )

  return { accountResponse: data, isAccountFetched: isFetchedAfterMount }
}
