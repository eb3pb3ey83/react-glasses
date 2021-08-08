import { FormikHelpers } from 'formik'
import { AlertModel } from 'src/shared/machine/alertMachine/model'

export interface Props {
  isCreate?: boolean
  companyNo?: string

  companyName?: string
  [key: string]: unknown
}

export interface CreateModeConfig {
  isEmailErr: boolean
  setFormikHelpers: React.Dispatch<React.SetStateAction<FormikHelpers<FormSchemaCreate | FormSchemaEdit> | ''>>
  closeDrawer?: () => void
}

export interface EditModeConfig {
  company_name: string
  companyId: string
  adminName: string
  openAlert: (message: AlertModel) => void
  closeDrawer: () => void
}
export interface FormSchemaCreate {
  company_model: '1'
  email: string
  job_title: string | null
  user_name: string
  company_name: string
  company_no: string
}

export interface FormSchemaEdit {
  company_model: '1'
  company_name: string
  customer_id: number
  user_id: number | null
}
