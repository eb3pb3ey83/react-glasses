export interface SettingRequestModel {
  type_id?: number
}

export interface SettingResponseModel {
  return_code: string
  return_message: string
  result_data: Setting[]
}

export interface Setting {
  field_type: string
  field_code: string
  data_type: string
  field_name_ch: string
  field_name_en: string
  field_start?: number
  field_end?: number
  field_step?: number
  field_place?: number
}
