export interface UpdateAccountModel {
  id: number
  updateData: {
    dept_id: number
    open_flag: '0' | '1' | '2'
    roles: number[]
    user_name_ch: string
    user_name_en: string
  }
}
