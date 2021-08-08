export interface AlertModel {
  title: string
  content: string
  isDicidedMode?: boolean
  onConfirm?: () => void
  confirmBtnLabel?: string
  onClose?: () => void
}
