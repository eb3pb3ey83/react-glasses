import { sortProps } from 'src/shared/components/ItemWithSort/model'

export interface Props {
  sortMethod: (orderBy: sortProps) => void
  headCells: HeadCells[]
}

interface HeadCells {
  id: string
  sort: sortProps
  label: string
  width?: number | string
}
