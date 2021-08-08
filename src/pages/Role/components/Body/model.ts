import { RoleResponseModel } from '../../services/role/model'

export interface Props {
  list: RoleResponseModel[]
  isFetched: boolean
  openEditor: (id: number) => void
}
