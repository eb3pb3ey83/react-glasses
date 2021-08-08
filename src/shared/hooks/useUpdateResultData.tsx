import { AxiosResponse } from 'axios'
import React from 'react'

interface Response<Data> {
  result_data: Data
  return_code: string
  return_message: string
  pagination?: Pagination
}

interface Pagination {
  current_page: number
  total_pages: number
  current_page_value_from: number
  current_page_value_to: number
  num_values: number
  links: unknown
}

interface Params<DataType> {
  updatedData: AxiosResponse<Response<DataType[] | DataType>> | undefined
  updateKeyName: Array<keyof DataType>
  action: (timeString: string | null, formatOpt?: string) => Promise<string | null>
}

function useUpdateResultData<DataType>({ updatedData, updateKeyName, action }: Params<DataType>) {
  const [dateData, setDateData] = React.useState<AxiosResponse<Response<DataType[] | DataType>>>()

  React.useEffect(() => {
    const updateFn = (value: DataType) => {
      let newTimeArr = updateKeyName.map(async (key) => {
        let newTime = await action((value[key] as unknown) as string)
        return newTime
      })
      return newTimeArr
    }
    if (updatedData) {
      let resultData
      const isDataArray = Array.isArray(updatedData.data.result_data)
      if (isDataArray) {
        resultData = updatedData.data.result_data as DataType[]
      } else {
        resultData = [updatedData.data.result_data] as DataType[]
      }
      let promiseResultData = resultData.map((value) => {
        return Promise.all(updateFn(value)).then((res) => {
          let newVal = { ...value }
          updateKeyName.forEach((key, idx) => {
            newVal = {
              ...newVal,
              [key]: res[idx],
            }
          })
          return newVal
        })
      })
      Promise.all(promiseResultData).then((val) => {
        setDateData({ ...updatedData, data: { ...updatedData.data, result_data: isDataArray ? val : val[0] } })
      })
    }
  }, [updatedData])

  if (dateData) return { dateData }
  return { dateData: null }
}

export default useUpdateResultData
