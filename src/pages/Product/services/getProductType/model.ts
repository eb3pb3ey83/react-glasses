export interface ProductTypeResponse {
  return_code: string
  return_message: string
  result_data: ProductTypeDataArray[]
}

export interface ProductTypeDataArray {
  id: number
  type_no: string
  type_name: string
  sort: number
  is_show: string
}

export interface ProductTypeReq {
  type_id?: string
}

export interface ProductInfo {
  return_code: string
  return_message: string
  result_data: Resultdata
}

interface Resultdata {
  id: number
  type_no: string
  type_name: string
  sort: number
  is_show: string
}

export interface ProductTypeAndSubResponse {
  return_code: string
  return_message: string
  result_data: ResultdataWithSubType
}

interface ResultdataWithSubType {
  id: number
  type_no: string
  type_name: string
  sort: number
  is_show: string
  sub_types: Subtype[]
}

interface Subtype {
  id: number
  type_no: string
  type_name: string
  sort: number
  is_show: string
}
