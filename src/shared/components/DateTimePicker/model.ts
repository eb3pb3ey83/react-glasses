export interface Props {
  valueDate: Date | undefined
  valueTime: Date | string
  onDateChange: (arg: Date) => void
  onTimeChange: (arg: Date | string) => void
  isTimeError?: boolean
  isDateError?: boolean
  isTimeDisabled?: boolean
  isDateDisabled?: boolean
}
