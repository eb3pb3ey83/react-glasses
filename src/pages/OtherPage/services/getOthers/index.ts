import { AxiosResponse } from 'axios'
import getService, { ApiConfig } from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { otherParms, othersListProps } from './model'

const url = '/relatedpages/pages'

export function getOthers(params: otherParms, language?: string): Promise<AxiosResponse<othersListProps>> {
  return getService<othersListProps, ApiConfig<otherParms>>({
    config: {
      url,
      method: 'get',
      headers: {
        'Accept-language': language ? language : 'en-US',
      },
      params,
    },
    name: apiKey.getOthers,
  })
}
