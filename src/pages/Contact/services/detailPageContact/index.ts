import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { DetailPageContactResresponseModel } from './model'

const url = 'contact/detail'

export function detailPageContact(
  params: { contact_id: string },
  openUnAuthAlert: () => void,
): Promise<AxiosResponse<DetailPageContactResresponseModel>> {
  return getService<DetailPageContactResresponseModel, ApiConfig<{ contact_id: string }>>(
    {
      config: {
        url: url,
        method: 'get',
        params: { contact_id: params.contact_id },
      },
      name: apiKey.detailPageContact,
    },
    openUnAuthAlert,
  )
}
