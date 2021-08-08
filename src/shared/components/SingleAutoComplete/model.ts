export interface Props {
  onSubmit: (keyword: string) => void

  options: string[]
  placeholder: string
  pageKeywordName: string
  width?: number
  [key: string]: unknown
}

export interface InputExtendedProps {
  onChange: (event: React.ChangeEvent<{ value: string }>) => void
  [key: string]: unknown
}
