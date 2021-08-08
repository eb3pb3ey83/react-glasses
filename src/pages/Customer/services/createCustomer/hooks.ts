import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { Errors } from 'src/core/services/base/handleFailure/model'
import { createCustomer } from '.'
import { RequestProps } from './model'

export const useCreateCustomer = () => {
  return useMutation<AxiosResponse<{ return_code: string }>, Errors, RequestProps, unknown>(createCustomer)
}
