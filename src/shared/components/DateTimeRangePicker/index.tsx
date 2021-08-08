import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { DateUtils, DayModifiers } from 'react-day-picker'
import { zhTW, enGB } from 'date-fns/locale'
import { differenceInMonths, format as fnsFormat } from 'date-fns'
import { ReactComponent as Arrow } from 'src/assets/icon/arrow-down-icon.svg'
import TimePicker from 'src/shared/components/TimePicker'
import { Modifiers, NavbarElementProps, Props } from './model'
import FormErrorHelperText from '../BlueFormContainer/FormErrorHelperText'
import useStyles from './useStyles'

export function NavBar({ onPreviousClick, onNextClick, className }: NavbarElementProps) {
  const goPrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onPreviousClick()
  }

  const goNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onNextClick()
  }

  return (
    <div className={className}>
      <button onClick={(e) => goPrev(e)}>
        <Arrow className='arrow' style={{ transform: 'rotate(90deg)' }} />
      </button>
      <button onClick={(e) => goNext(e)}>
        <Arrow className='arrow' style={{ transform: 'rotate(270deg)' }} />
      </button>
    </div>
  )
}

export function CaptionEle({ date }: { date: Date }) {
  return (
    <div className='DayPicker-Caption'>
      <span>{date.getFullYear()}</span> <span>{fnsFormat(date, 'MMMM', { locale: zhTW })}</span>
    </div>
  )
}

const DateTimeRange: React.FC<Props> = ({
  onTimesChange,
  toTime,
  fromTime,
  fromDate,
  toDate,
  onDatesChange,
  dateError = { from: false, to: false },
  timeError = { from: false, to: false },
  dateDisabled = { from: false, to: false },
  timeDisabled = { from: false, to: false },
}) => {
  const classes = useStyles()
  const [inputRef, setInputRef] = React.useState<DayPickerInput | null>(null)
  const modifiers: Partial<Modifiers> | undefined = { start: fromDate, end: toDate }

  const formatDate = (date: Date, format: string, locale: string): string => {
    let mylocale = enGB
    if (locale === 'zh-wt') {
      mylocale = zhTW
    }
    return dateFnsFormat(date, format, { locale: mylocale })
  }

  const parseDate = (str: string, format: string, locale: string): void | Date => {
    let mylocale = enGB
    if (locale === 'zh-wt') {
      mylocale = zhTW
    }
    const parsed = dateFnsParse(str, format, new Date(), { locale: mylocale })
    if (DateUtils.isDate(parsed)) {
      return parsed
    }
    return undefined
  }

  const handleFromChange = (from: Date, type: 'from' | 'to') => {
    onDatesChange(from, type)
  }

  const showFromMonth = () => {
    if (!fromDate) return
    if (differenceInMonths(toDate as Date, fromDate) < 2) {
      inputRef && inputRef.getDayPicker().showMonth(fromDate)
    }
  }

  const handleToChange = (to: Date, type: 'from' | 'to') => {
    onDatesChange(to, type)
    showFromMonth()
  }

  const handleDayClick = (_day: Date, modif: DayModifiers) => {
    if (modif.disabled) return
    inputRef && inputRef.getInput().focus()
  }

  return (
    <div className={classes.inputFromTo}>
      <div className={`${classes.inputWithHelper} ${dateError.from ? 'error' : ''}`}>
        <DayPickerInput
          value={fromDate}
          placeholder='YYYY/MM/DD'
          format='yyyy-M-dd'
          inputProps={{ readOnly: true, disabled: dateDisabled.from }}
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [fromDate, { from: fromDate, to: toDate }],
            disabledDays: { after: toDate, before: new Date() },
            toMonth: toDate,
            modifiers: modifiers,
            numberOfMonths: 2,
            onDayClick: handleDayClick,
            className: classes.inputContainer,
            navbarElement: NavBar,
            captionElement: CaptionEle,
          }}
          onDayChange={(value) => handleFromChange(value, 'from')}
        />
        <FormErrorHelperText style={{ marginTop: '8px' }} text={dateError.from ? '此為必填欄位' : ''} />
      </div>
      <TimePicker
        isDisabled={timeDisabled.from}
        value={fromTime}
        onChange={(value) => onTimesChange(value, 'from')}
        selectedDate={fromDate}
        isError={timeError.from}
      />
      <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
        <div className={classes.rectangle} />
      </div>
      <div className='InputFromTo-to'>
        <div className={`${classes.inputWithHelper} ${dateError.to ? 'error' : ''}`}>
          <DayPickerInput
            ref={(element) => setInputRef(element)}
            inputProps={{ readOnly: true, disabled: dateDisabled.to }}
            value={toDate}
            placeholder='YYYY/MM/DD'
            format='yyyy-M-dd'
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [fromDate, { from: fromDate, to: toDate }],
              disabledDays: fromDate && { before: fromDate },
              modifiers,
              month: fromDate,
              fromMonth: fromDate,
              numberOfMonths: 2,
              className: classes.inputContainer,
              navbarElement: NavBar,
              captionElement: CaptionEle,
            }}
            onDayChange={(value) => handleToChange(value, 'to')}
          />
          <FormErrorHelperText style={{ marginTop: '8px' }} text={dateError.to ? '此為必填欄位' : ''} />
        </div>
      </div>
      <TimePicker
        isDisabled={timeDisabled.to}
        timeType='end'
        value={toTime}
        onChange={(value) => onTimesChange(value, 'to')}
        selectedDate={toDate}
        isError={timeError.to}
      />
    </div>
  )
}

export default DateTimeRange
