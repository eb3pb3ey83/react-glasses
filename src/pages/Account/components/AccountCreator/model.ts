import { RoleResponseModel } from 'src/pages/Role/services/role/model'
import { DeptsResponseModel } from '../../services/depts/model'

export interface Props {
  closeDrawer: () => void
  deptList: DeptsResponseModel[]
  roleList: RoleResponseModel[]
  openToast: (message: string) => void
}
