export interface Button {
  id: number
  button_name_ch: string
  button_name_en: string
  sort: 1
  button_code: string
  open_flag: string
}
export interface MenuButtonsModel {
  id: number
  menu_name_ch: string
  menu_name_en: string
  buttons: Button[]
  sub_menu: MenuButtonsModel[]
}

export interface MenusButtonResponse {
  result_data: MenuButtonsModel[]
}
