import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { DetailPageFaqResresponseModel } from './model'

const url = 'faq'

export function detailPageFaq(
  params: { id: string | undefined },
  openUnAuthAlert: () => void,
): Promise<AxiosResponse<DetailPageFaqResresponseModel>> {
  return getService<DetailPageFaqResresponseModel, ApiConfig<{ id: string }>>(
    {
      config: {
        url: `${url}/${params.id}`,
        method: 'get',
      },
      name: apiKey.detailPageFaq,
    },
    openUnAuthAlert,
  )
}
