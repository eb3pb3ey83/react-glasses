export interface SubDept {
  id: number
  dept_name_ch: string
  dept_name_en: string
  parent_id: number
  sub_dept: []
}

export interface DeptsResponseModel {
  id: number
  dept_name_ch: string
  dept_name_en: string
  parent_id: null | number
  sub_dept: SubDept[]
}

export interface DeptsList {
  result_data: DeptsResponseModel[]
}
