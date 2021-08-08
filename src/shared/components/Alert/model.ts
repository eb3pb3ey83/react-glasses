export interface Props {
  title: string
  content: string
  isDicidedMode: boolean
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  cancelBtnLabel?: string
  confirmBtnLabel?: string
}
