export interface ReqProps {
  id: number
}

export interface ResProps {
  return_code: string
  return_message: string
  result_data: Resultdata
}

export interface Resultdata {
  id: number
  job_title?: string
  user_name: string
  email: string
  role_type: string
  order_chk: string
  level_view: string
  open_flag: string
  roles: DetailRole[]
}

export interface DetailRole {
  id: number
  menu_name: string
  menu_name_ch: string
  menu_name_en: string
  menu_path: string
  menu_type: string
  sort: number
  open_flag: string
  menu_icon?: unknown
  parent_id?: unknown
  buttons?: Button[]
  sub_menu?: Submenu[]
}

interface Submenu {
  id: number
  menu_name: string
  menu_name_ch: string
  menu_name_en: string
  menu_path: string
  menu_type: string
  sort: number
  open_flag: string
  menu_icon?: unknown
  parent_id: number
  buttons: Button[]
}

interface Button {
  id: number
  button_name: string
  button_name_ch: string
  button_name_en: string
  sort: number
  button_code: string
  open_flag: string
  isChose: string
}
