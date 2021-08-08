import { AxiosResponse } from 'axios'

interface Response<Data> {
  result_data: Data
  return_code: string
  return_message: string
}

interface Params<DataType> {
  updatedData: AxiosResponse<Response<DataType[]>>
  updateKeyName: string
  action: (value: DataType) => unknown
}
export function updateResultData<DataType>({ updatedData, updateKeyName, action }: Params<DataType>) {
  let resultData = updatedData.data.result_data

  resultData = resultData.map((value) => ({
    ...value,
    [updateKeyName]: action(value),
  }))

  updatedData.data.result_data = resultData

  return updatedData
}
