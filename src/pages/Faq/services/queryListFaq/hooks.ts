import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'

import { getFaqList } from '.'
import Context from '../../machineConfig/context'
export default function useQueryListFaq(context: Context, openUnAuthAlert: () => void) {
  const { language } = useLanguage()
  const { country_id, country_type } = context
  const FetchFunction = () => getFaqList(openUnAuthAlert, { country_id, country_type }, language)

  const { data } = useNoCacheQuery([apiKey.getFaqList, country_id, country_type, language], FetchFunction)

  return { data, isFetched: !!data }
}
