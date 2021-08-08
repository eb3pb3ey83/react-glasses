export interface Props {
  label: string
  checked: boolean
  onChange: (event: React.ChangeEvent<unknown>, checked: boolean) => void
  [key: string]: unknown
}
