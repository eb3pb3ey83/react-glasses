import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { contactParams, contactListProps } from './model'

const url = 'contact'

export function getContact(openUnAuthAlert: () => void, params: contactParams, language?: string): Promise<AxiosResponse<contactListProps>> {
  return getService<contactListProps, ApiConfig<contactParams>>(
    {
      config: {
        url,
        method: 'get',
        headers: {
          'Accept-language': language ? language : 'en-US',
        },
        params,
      },
      name: apiKey.getContact,
    },
    openUnAuthAlert,
  )
}
