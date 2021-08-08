export interface SortRequest {
  type_id_list: number[]
}

export interface SortResponse {
  return_code: string
  return_message: string
  result_data: string
}
