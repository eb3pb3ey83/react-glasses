import { AccountInfoModel } from 'src/pages/Account/services/accountInfo/model'
import { DeptsResponseModel } from 'src/pages/Account/services/depts/model'
import { RoleResponseModel } from 'src/pages/Account/services/role/model'

export interface Props {
  openToast: (message: string) => void
  closeDrawer: () => void
  deptList: DeptsResponseModel[]
  roleList: RoleResponseModel[]
  accountInfo?: AccountInfoModel
}
