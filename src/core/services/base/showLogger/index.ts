import { AxiosResponse } from 'axios'
import { dataObject } from 'src/shared/types/data.type'

export default function showLogger(action: string, response?: dataObject | AxiosResponse<dataObject>, isError?: boolean): void {
  const responseStyle = `font-weight: bold; color: ${isError ? 'red' : '#B5B5B5'};`

  // eslint-disable-next-line no-console
  console.groupCollapsed(`api status: ${action}`)

  // eslint-disable-next-line no-console
  console.log('%c response', responseStyle, response)

  // eslint-disable-next-line no-console
  console.groupEnd()
}
