import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { SortFaqModel } from './model'

const url = 'faq'

export function dndSortFaq(data: SortFaqModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<SortFaqModel>>(
    {
      config: {
        url,
        method: 'patch',
        data,
      },
      name: apiKey.sortFaq,
    },
    openUnAuthAlert,
  )
}
