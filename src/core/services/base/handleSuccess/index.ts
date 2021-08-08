import showLogger from '../showLogger'
import { ApiConfig } from '..'
import { dataObject } from '../../../../shared/types/data.type'
import { AxiosResponse } from 'axios'

export default function handleSuccess<responseType extends dataObject>(
  response: AxiosResponse<responseType>,
  apiInfo: ApiConfig,
): AxiosResponse<responseType> {
  showLogger(`${apiInfo.name}_SUCCESS`, response.data)

  return response
}
