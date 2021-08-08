import { MenuResponse } from 'src/core/services/menu/model'

export interface MenuInfo {
  menu_icon: string | null
  menu_path: string
  menu_name_ch: string
  menu_name_en: string
  sub_menu?: MenuInfo[] | null
  arrow?: boolean
  id: number
  menu_type: string
  parent_id: number | null
}

export interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // eslint-disable-next-line react/require-default-props
  window?: () => Window
  isMenuOpen?: boolean
  menuData?: MenuResponse['result_data']
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
