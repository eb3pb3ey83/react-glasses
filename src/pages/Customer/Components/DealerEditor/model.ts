import { FormikHelpers } from 'formik'

export interface Props {
  isCreate?: boolean

  companyName?: string
  [key: string]: unknown
}

export interface FormConfig {
  companyId: string
  closeDrawer: () => void
  isEmailErr?: boolean
  setFormikHelpers?: React.Dispatch<React.SetStateAction<FormikHelpers<FormSchemaCreate | FormSchemaEdit> | ''>>
  company_name?: string
  tel?: string
  order_chk?: string
  open_flag?: string
}
export interface FormSchemaCreate {
  company_model: '2'
  company_name: string
  tel: string
  email: string
  job_title: string | null
  user_name: string
  parent_id: string
  order_chk: string
}

export interface FormSchemaEdit {
  company_model: '2'
  company_name: string
  open_flag: string
  tel: string
  order_chk: string
  customer_id: string
  user_id?: string
}
