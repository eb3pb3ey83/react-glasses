import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { CreateContactModel } from './model'

const url = 'contact'

export function createContact(data: CreateContactModel, openUnAuthAlert: () => void): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<CreateContactModel>>(
    {
      config: {
        url,
        method: 'post',
        data,
      },
      name: apiKey.createContact,
    },
    openUnAuthAlert,
  )
}
