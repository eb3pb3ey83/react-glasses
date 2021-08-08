import { OrderChangeContact } from 'src/pages/Contact/machineConfig/event'
import { OrderChange } from 'src/pages/Role/machineConfig/event'

export type sortProps =
  | 'user_name_ch'
  | '-user_name_ch'
  | 'user_name_en'
  | '-user_name_en'
  | 'email'
  | '-email'
  | 'dept_id'
  | '-dept_id'
  | 'open_flag'
  | '-open_flag'
  | 'created_time'
  | '-created_time'
  | '-role_name_ch'
  | '-role_type'
  | '-created_time'
  | '-updated_time'
  | 'role_name_ch'
  | 'role_type'
  | 'created_time'
  | 'updated_time'
  | 'newssection__section_content'
  | '-newssection__section_content'
  | 'country_type'
  | '-country_type'
  | 'news_datestart'
  | '-news_datestart'
  | 'infocontactsection__company_name'
  | '-infocontactsection__company_name'
  | 'type'
  | '-type'
  | 'updated_user_ch'
  | 'updated_user_en'
  | '-updated_user_ch'
  | '-updated_user_en'
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
  | string

export interface Props {
  align?: 'left' | 'right'
  width?: number | string
  sortUp: sortProps | OrderChange['order_by'] | OrderChangeContact['order']
  sortDown: sortProps | OrderChange['order_by'] | OrderChangeContact['order']
  disabledSort?: boolean
  sortMethod?: ((orderBy: sortProps) => void) | ((orderBy: OrderChange['order_by']) => void) | ((orderBy: OrderChangeContact['order']) => void)
}
