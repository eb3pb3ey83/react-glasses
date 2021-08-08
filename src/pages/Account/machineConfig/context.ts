import { sortProps } from 'src/shared/components/ItemWithSort/model'

interface Context {
  currentPage: number
  user_name: string
  order: sortProps
  roles: number[] | []
  depts: number[] | []
  open_flag: '0' | '1' | '2' | 'all'
  toastMessage: string
}

export default Context
