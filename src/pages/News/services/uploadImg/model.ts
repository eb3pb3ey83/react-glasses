export interface RootObject {
  return_code: string
  return_message: string
  result_data: result_data
}

interface result_data {
  [key: string]: number
}
