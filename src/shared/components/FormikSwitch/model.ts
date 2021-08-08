export interface Props {
  name: string
  onChange?: (
    values?: {
      [key: string]: unknown
    },
    setValues?: (
      values: React.SetStateAction<{
        [key: string]: unknown
      }>,
      shouldValidate?: boolean | undefined,
    ) => void,
  ) => void
  className?: string
  label?: string
  checked?: boolean
  title?: string
  labelClassName?: string
  [key: string]: unknown
  style?: Record<string, string>
}
