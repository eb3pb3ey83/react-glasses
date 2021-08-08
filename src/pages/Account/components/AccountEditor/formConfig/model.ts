export interface FormModel {
  mainDeptId: number
  sub_deptId: number
  email: string
  roles: number[]
  user_name_ch: string
  user_name_en: string
  openFlag?: '0' | '1' | '2'
}
