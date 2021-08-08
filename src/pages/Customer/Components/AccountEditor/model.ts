export interface Props {
  isCreate?: boolean
  isCompany?: boolean
}

export interface RolesType {
  id: number
  code: string
}

export interface RolesAllType {
  [key: number]: '0' | '1' | '2'
}

export interface FormSchema {
  name: string
  email: string
  job_title?: string
  role_type: '1' | '2' | '3' | null
  roles1: RolesType[]
  roles1_all: RolesAllType
  roles2: RolesType[]
  roles2_all: RolesAllType
  roles3: RolesType[]
  roles3_all: RolesAllType
  noNeedVerify?: '0' | '1'
  hasEditAuth?: '0' | '1'
  [key: string]: unknown
  open_flag?: '0' | '1' | '2'
}
