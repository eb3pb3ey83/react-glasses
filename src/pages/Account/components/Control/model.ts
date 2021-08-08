import { DeptsResponseModel } from '../../services/depts/model'
import { RoleResponseModel } from '../../services/role/model'

export interface Props {
  searchKeyword: (keyword: string) => void
  changeDepts: (depts: number[]) => void
  changeRoles: (roles: number[]) => void
  changeOpenFlag: (dept: '0' | '1' | '2') => void
  deptList: DeptsResponseModel[]
  roleList: RoleResponseModel[]
}
