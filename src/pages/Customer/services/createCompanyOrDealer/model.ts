export interface CreateCompanyOrDealerModel {
  company_model: string
  company_name?: string
  company_no?: string
  email?: string
  job_title?: string | null
  order_chk?: string
  parent_id?: string
  tel?: string
  user_name?: string
}

export interface openSuccessToast {
  (message: string): void
  (message: string, secondMessage?: string): void
}
