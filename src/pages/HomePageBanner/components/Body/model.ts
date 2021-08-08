import { Resultdata } from 'src/shared/services/getBanner/model'

export interface Props {
  list?: Resultdata[]
  isFetched?: boolean
  openEditor?: (id: number) => void
  countryType: '2' | '1'
}
