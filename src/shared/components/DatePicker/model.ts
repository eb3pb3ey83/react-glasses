export interface Props {
  value: Date | undefined
  onChange: (arg: Date) => void
  isError?: boolean
  isDisabled?: boolean
}
