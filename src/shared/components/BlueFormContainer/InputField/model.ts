export interface Props {
  label?: string
  placeholder?: string
  height?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  [key: string]: unknown
}
