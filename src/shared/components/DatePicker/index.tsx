import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format'
import { zhTW, enGB } from 'date-fns/locale'
import { CaptionEle, NavBar } from 'src/shared/components/DateTimeRangePicker'
import { Props } from './model'
import FormErrorHelperText from '../BlueFormContainer/FormErrorHelperText'
import { WeekdayElementProps } from 'react-day-picker'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useStyles from './useStyles'

const WeekDay: React.FC<WeekdayElementProps> = ({ weekday, className, localeUtils, locale }) => {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)
  const { language } = useLanguage()
  const isCh = language?.includes('zh')
  const weekdayTrans = () => {
    switch (weekday) {
      case 0:
        return isCh ? '週日' : weekdayName.slice(0, 2)
      case 1:
        return isCh ? '週一' : weekdayName.slice(0, 2)
      case 2:
        return isCh ? '週二' : weekdayName.slice(0, 2)
      case 3:
        return isCh ? '週三' : weekdayName.slice(0, 2)
      case 4:
        return isCh ? '週四' : weekdayName.slice(0, 2)
      case 5:
        return isCh ? '週五' : weekdayName.slice(0, 2)
      case 6:
        return isCh ? '週六' : weekdayName.slice(0, 2)
      default:
        return ''
    }
  }
  return (
    <div className={className} title={weekdayName}>
      {weekdayTrans()}
    </div>
  )
}
WeekDay.displayName = 'WeekDay'

const SingleDatePicker: React.FC<Props> = ({ value, onChange, isError = false, isDisabled = false }) => {
  const classes = useStyles()

  const formatDate = (date: Date, format: string, locale: string): string => {
    let mylocale = enGB
    if (locale === 'zh-wt') {
      mylocale = zhTW
    }
    return dateFnsFormat(date, format, { locale: mylocale })
  }

  const handleDayChange = (sd: Date) => {
    onChange(sd)
  }

  return (
    <div className={`${classes.inputSingle} ${isError ? 'error' : ''}`}>
      <DayPickerInput
        value={value}
        format='yyyy-M-dd'
        placeholder='YYYY/MM/DD'
        formatDate={formatDate}
        inputProps={{ readOnly: true, disabled: isDisabled }}
        onDayChange={handleDayChange}
        dayPickerProps={{
          selectedDays: value,
          className: classes.inputContainer,
          captionElement: CaptionEle,
          navbarElement: NavBar,
          showOutsideDays: true,
          disabledDays: {
            before: new Date(),
          },
          weekdayElement: WeekDay,
        }}
      />
      {<FormErrorHelperText style={{ marginTop: '8px' }} text={isError ? '此為必填欄位' : ''} />}
    </div>
  )
}

export default SingleDatePicker
