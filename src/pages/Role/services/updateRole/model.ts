export interface UpdateRoleModel {
  id: number
  updateData: {
    menus_buttons_id: number[]
    role_name_ch: string
    role_name_en: string
    role_type: 0 | 1 | 2
  }
}
