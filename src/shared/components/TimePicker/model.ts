export const localStyle = {
  timePicker: {
    borderRadius: '0px 8px 8px 0px',
  },
}

export interface Props {
  value: Date | string
  onChange: (value: Date | string) => void
  selectedDate?: Date | undefined
  timeType?: 'start' | 'end'
  isError?: boolean
  isDisabled?: boolean
}
