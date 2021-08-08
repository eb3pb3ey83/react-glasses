import { Resultdata } from 'src/shared/services/getBanner/model'

export interface Props {
  closeDrawer: () => void
  openToast: (message: string) => void
  list?: Resultdata[]
}
