export interface RoleInfoRequestModel {
  id: string
}

interface Menu {
  menu_name_ch: string
  menu_name_en: string
  menusbuttons: MenuButtons[]
}

interface MenuButtons {
  id: number
  button_name_ch: string
  button_name_en: string
  open_flag: string
}

export interface RoleInfoModel {
  role_name_ch: string
  role_name_en: string
  role_type: number
  menus: Menu[]
}

export interface RoleInfoReponseModel {
  result_data: RoleInfoModel
}
