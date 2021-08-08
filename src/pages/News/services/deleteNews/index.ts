import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { deleteProps } from './model'
const url = 'news/manage'

export function deleteNews(data: deleteProps, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<deleteProps>>(
    {
      config: {
        url,
        method: 'delete',
        data,
      },
      name: apiKey.deleteNews,
    },
    openUnAuthAlert,
  )
}
