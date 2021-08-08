import { DeptsResponseModel, SubDept } from 'src/pages/Account/services/depts/model'

export interface Props {
  deptList: DeptsResponseModel[]
  disabled: boolean
}

export type DeptModel = DeptsResponseModel | SubDept
