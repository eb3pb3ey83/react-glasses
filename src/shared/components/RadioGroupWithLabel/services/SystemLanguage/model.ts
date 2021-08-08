export interface SysLanguageObject {
  return_code: string
  return_message: string
  result_data: SysLanguageItem[]
}

export interface SysLanguageItem {
  id: number
  code_type: string
  code_no: string
  code_name_ch: string
  code_name_en: string
  open_flag: string
  created_user: number
  created_time: string
  updated_user: number
  updated_time: string
}
export interface SysParam {
  code_type: string
  open_flag: string
  code_no?: string
}
