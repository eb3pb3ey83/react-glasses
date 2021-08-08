export interface Props {
  severity: 'success' | 'error' | 'warning' | 'info' | 'success'
  open: boolean
  onClose: (event?: React.SyntheticEvent, reason?: string) => void
  message: string
  autoHideDuration?: number
  anchorOrigin?: {
    horizontal: 'center' | 'left' | 'right'
    vertical: 'bottom' | 'top'
  }
  [key: string]: unknown
}
