import { HeadandBody } from '../Drop/model'

export interface Props<Type> {
  list?: Type[]
  isLoading?: boolean
  itemOnClick: (id?: number) => void
  countryType?: '2' | '1'
  [key: string]: unknown
  getHeadandBody?: HeadandBody
  enabelDnd?: boolean
}
