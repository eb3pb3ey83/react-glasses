import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { sectionsProps } from './model'
const url = '/relatedpages/section'

export function updateOhterDetail(data: sectionsProps[], id: string): Promise<AxiosResponse<unknown>> {
  return getService<unknown, ApiConfig<sectionsProps[]>>({
    config: {
      url: `${url}`,
      method: 'patch',
      data,
      params: { other_id: id },
    },
    name: apiKey.updateOtherDetail,
  })
}
