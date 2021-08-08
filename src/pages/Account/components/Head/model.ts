import { sortProps } from 'src/shared/components/ItemWithSort/model'

export interface Props {
  sortMethod: (orderBy: sortProps) => void
}
