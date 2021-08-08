export interface CompanyDetailRequestModel {
  company_model: string
  customer_id: string
}
export interface CompanyDetailResponseModel {
  return_code: string
  return_message: string
  result_data: CompanyDetail
}

export interface CompanyDetail {
  id: number
  company_model: string
  company_no?: string
  company_name: string
  country_id: number
  parent_id: number
  tel: string
  order_chk: string
  open_flag: string
  company_type: string
  company_type_name: string
  user_name: string
}
