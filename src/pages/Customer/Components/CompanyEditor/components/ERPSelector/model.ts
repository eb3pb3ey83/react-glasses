import { AlertModel } from 'src/shared/machine/alertMachine/model'

export interface Props {
  country_type: string
  isCreate: boolean
  openAlert: (message: AlertModel) => void
  companyNo?: string
  disabled?: boolean
}
