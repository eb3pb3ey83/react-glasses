import { DetailRole } from 'src/pages/Customer/services/getCustomerDetail/model'
export interface Props {
  name: string
  menuBtns: DetailRole[] | undefined
  disabled?: boolean
}
