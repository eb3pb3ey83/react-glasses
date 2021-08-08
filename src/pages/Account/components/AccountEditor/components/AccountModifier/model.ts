import { DeptsResponseModel } from 'src/pages/Account/services/depts/model'
import { RoleResponseModel } from 'src/pages/Role/services/role/model'

export interface Props {
  deptList: DeptsResponseModel[]
  roleList: RoleResponseModel[]
  hasUpdatePermission: boolean
}
