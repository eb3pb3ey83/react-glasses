import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getContact } from '.'
// import { contactParams } from './model'
import Context from '../../machineConfig/context'

export default function useGetContact(context: Context, openUnAuthAlert: () => void) {
  const { language } = useLanguage()
  const { country_type, page, page_size, order, company_name } = context
  const FetchFunction = () => getContact(openUnAuthAlert, { country_type, page, page_size, order, company_name }, language)

  const { data, isSuccess, isLoading } = useNoCacheQuery(
    [apiKey.getContact, country_type, page, page_size, order, company_name, language],
    FetchFunction,
  )

  return { response: data, isSuccess, isLoading }
}
