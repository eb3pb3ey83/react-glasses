import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { getBanner } from 'src/shared/services/getBanner'
import { BannerRequestModel } from './model'
export default function useLoginBanner(param: BannerRequestModel) {
  const { language } = useLanguage()
  const { country_type, ban_type, open_flag } = param
  const FetchFunction = () => getBanner(param, language)
  const { data, isFetching } = useNoCacheQuery([apiKey.getBanner, country_type, ban_type, open_flag, language], FetchFunction)

  return { response: data, isFetched: !isFetching && !!data }
}
