import { dataObject } from '../../../../shared/types/data.type'
import { ApiConfig } from '..'

export default function debug(reason: dataObject, apiInfo: ApiConfig): void {
  const { url } = apiInfo.config
  const { message } = reason

  // eslint-disable-next-line no-console
  console.warn(`${url} \n - status: ${reason?.status ?? reason.returnCode} \n - message: ${message}\n\n`, reason)
}
