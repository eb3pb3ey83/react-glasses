export interface Props {
  options: { id: number; name: string }[]
  placeholder: string
  onChange: (ids: number[]) => void
  [key: string]: unknown
}
