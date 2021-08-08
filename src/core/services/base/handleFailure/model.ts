import { dataObject } from 'src/shared/types/data.type'

export interface Errors {
  response: dataObject & { [key: string]: unknown; data: { return_code: string; return_message: { [key: string]: string } } }
  [key: string]: unknown
}
