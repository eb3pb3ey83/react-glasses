import { sortProps } from 'src/shared/components/ItemWithSort/model'

interface Context {
  currentPage: number
  page_size: number
  keyword: string
  order_by: sortProps
  publicStatus: string
  role_type: '1' | '2'
}

export default Context
