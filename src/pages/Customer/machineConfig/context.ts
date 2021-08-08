// import { sortProps } from 'src/shared/components/ItemWithSort/model'

interface Context {
  country_type?: 'all' | '1' | '2'
  page_size: number
  keyword?: string
  user_name?: string
  role_type?: 'all' | '1' | '3' | '2'
  open_flag: 'all' | '0' | '1' | '2'
  page: number
  order:
    | 'company_name'
    | '-company_name'
    | 'company_no'
    | '-company_no'
    | 'company_type'
    | '-company_type'
    | 'open_flag'
    | '-open_flag'
    | 'user_name'
    | '-user_name'
    | 'email'
    | '-email'
    | 'role_type'
    | '-role_type'
    | 'job_title'
    | '-job_title'
    | 'created_time'
    | '-created_time'
    | string
}

export default Context
