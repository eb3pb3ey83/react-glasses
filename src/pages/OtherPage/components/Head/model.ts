export interface Props {
  headCells: HeadCells[]
}

export interface HeadCells {
  id: string
  label: string
  width?: number | string
}
