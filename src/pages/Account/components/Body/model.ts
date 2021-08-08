import { AccountResponseModel } from '../../services/account/model'

export interface Props {
  list: AccountResponseModel[]
  isFetched: boolean
  openEditor: (id: number) => void
}
