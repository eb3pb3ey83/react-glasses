import { createContext } from 'react'

interface TableProps {
  openCreator?: () => void
  closeDrawer?: () => void
  openEditor?: (id?: number | undefined) => void
  setIsToastError?: React.Dispatch<React.SetStateAction<boolean>>
  isToastOpen?: boolean
  toastMessage?: string
  autoHideDuration?: number
  closeToast?: () => void
  // openToast?(message: string, isError?: boolean | undefined): void
  // openToast?(message: string, secondMessage?: string): void
  openToast?: ({ message, error }: { message: string[]; error: boolean[] }) => void
  openToastSingle?: OpenToastSingle
  hasAddPermission?: boolean
}

export type OpenToastSingle = (message: string, isError?: boolean | undefined) => void

export interface Props {
  value: TableProps
}

export const TableContext = createContext<TableProps>({})
