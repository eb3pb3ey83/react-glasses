import { dataObject } from '../../../../shared/types/data.type'
import { ApiConfig } from '..'

export default function getErrorMessage(response: dataObject, apiInfo: ApiConfig): string {
  const { status } = response

  const messages = apiInfo.withAccessToken
    ? {
        400: '參數錯誤。',
        401: '憑證已過期。',
      }
    : {
        400: '參數錯誤。',
      }

  return (messages[status as 400 | 401] as string) || 'Unhandled Error!'
}
