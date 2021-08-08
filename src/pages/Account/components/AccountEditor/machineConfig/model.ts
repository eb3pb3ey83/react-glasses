export interface AlertModel {
  title: string
  content: string
  isDicidedMode?: boolean
  onConfirm?: () => void
}
