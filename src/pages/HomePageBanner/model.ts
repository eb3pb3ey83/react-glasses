import { sortProps } from 'src/shared/components/ItemWithSort/model'

export interface HeadCells {
  id: string
  sort: sortProps
  label: string
  width?: number | string
}
