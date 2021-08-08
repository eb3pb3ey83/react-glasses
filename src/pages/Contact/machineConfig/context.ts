// import { sortProps } from 'src/shared/components/ItemWithSort/model'

interface Context {
  country_type: '1' | '2'
  currentPage: number
  page_size: number
  company_name: string
  page?: number
  order:
    | 'infocontactsection__company_name'
    | '-infocontactsection__company_name'
    | 'area'
    | '-area'
    | 'type'
    | '-type'
    | 'updatedUser'
    | '-updatedUser'
    | 'updatedTime'
    | '-updatedTime'
  role_type: '1' | '2'
}

export default Context
