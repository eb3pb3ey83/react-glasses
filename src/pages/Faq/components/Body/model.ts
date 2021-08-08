import { FaqResponseModel } from '../../services/queryListFaq/model'

export interface Props {
  list: FaqResponseModel[]
  isFetched: boolean
  openEditor: (id: number) => void
  countryType: '2' | '1'
}
