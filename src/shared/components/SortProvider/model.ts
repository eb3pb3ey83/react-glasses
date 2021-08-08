import { createContext } from 'react'

interface SortProps {
  currentSort: string
  initializePage?: () => void
}

export interface Props {
  value: SortProps
}

export const SortContext = createContext<SortProps>({ currentSort: '' })
