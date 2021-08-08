import { MenuInfo } from 'src/shared/components/Menu/model'

export interface MenuResponse {
  result_data: {
    role_type: '0' | '1' | '2'
    menus: MenuInfo[]
  }
}
