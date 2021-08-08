export interface Props {
  headCells: HeadCells[]
  sortMethod: (
    order:
      | 'company_name'
      | '-company_name'
      | 'company_no'
      | '-company_no'
      | 'company_type'
      | '-company_type'
      | 'open_flag'
      | '-open_flag'
      | 'user_name'
      | '-user_name'
      | string,
  ) => void
}

export interface HeadCells {
  id: string
  label: string
  width?: number | string
  sort: string
}
