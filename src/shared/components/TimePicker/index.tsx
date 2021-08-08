import React from 'react'
import { ReactComponent as TimerIcon } from 'src/assets/icon/timer-icon.svg'
import RCTimePicker, { TimePickerValue } from 'react-time-picker'
import { localStyle, Props } from './model'
import { useTimePickerStyle } from './useStyles'
import { isToday, isAfter, add, format } from 'date-fns'
import FormErrorHelperText from '../BlueFormContainer/FormErrorHelperText'

const TimePicker: React.FC<Props> = ({ value, onChange, selectedDate, timeType = 'start', isError = false, isDisabled = false }) => {
  const classes = useTimePickerStyle(localStyle)

  const endTimeAdded = () => {
    if (timeType === 'end') return format(add(new Date(), { minutes: 1 }), 'HH:mm')
    return format(new Date(), 'HH:mm')
  }

  React.useEffect(() => {
    if (selectedDate && isToday(selectedDate) && isAfter(new Date(), new Date(Date().replace(/(\d\d):(\d\d)/, value as string)))) {
      onChange(endTimeAdded())
    }
  }, [selectedDate])

  const onTimeChange = (time: TimePickerValue) => {
    const timeInDate = new Date(Date().replace(/(\d\d):(\d\d)/, time as string))
    let todayTime = new Date()
    if (timeType === 'end') {
      todayTime = add(new Date(), { minutes: 1 })
    }

    if (selectedDate && isToday(selectedDate) && isAfter(todayTime, timeInDate)) {
      return onChange(format(todayTime, 'HH:mm'))
    }
    return onChange(time)
  }

  return (
    <div className={classes.pickerOutline}>
      <TimerIcon className={classes.pickerIcon} />
      <RCTimePicker
        format='HH:mm'
        hourPlaceholder='HH'
        minutePlaceholder='MM'
        clearIcon={null}
        clockIcon={null}
        disableClock={true}
        minTime={selectedDate && isToday(selectedDate) ? format(new Date(), 'HH:mm') : undefined}
        className={`${classes.RCtimePicker} ${isError ? 'error' : ''}`}
        value={value}
        disabled={isDisabled}
        onChange={onTimeChange}
        autoFocus={false}
      />
      <FormErrorHelperText style={{ marginTop: '8px' }} text={isError ? '此為必填欄位' : ''} />
    </div>
  )
}

export default TimePicker
