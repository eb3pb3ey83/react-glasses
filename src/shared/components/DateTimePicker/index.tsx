import React from 'react'
import TimePicker from 'src/shared/components/TimePicker'
import DatePikcer from 'src/shared/components/DatePicker'
import { Props } from './model'

const DateTimePicker: React.FC<Props> = ({
  valueDate,
  onDateChange,
  valueTime,
  onTimeChange,
  isDateError = false,
  isTimeError = false,
  isDateDisabled = false,
  isTimeDisabled = false,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <DatePikcer value={valueDate} onChange={onDateChange} isError={isDateError} isDisabled={isDateDisabled} />
      <TimePicker value={valueTime} onChange={onTimeChange} isError={isTimeError} selectedDate={valueDate} isDisabled={isTimeDisabled} />
    </div>
  )
}

export default DateTimePicker
