import { format } from 'date-fns'
import { actionProps, stateProps } from '../components/FormContent/model'
import { dateValidate, setDateError, setDateErrorT } from './model'

const checkDateError = ({ value, isRange }: setDateError | setDateErrorT) => {
  let error = { from: false, to: false }
  let isPass = true
  if (isRange) {
    if (!value.from) {
      error = { ...error, from: true }
      isPass = false
    }
    if (!value.to) {
      error = { ...error, to: true }
      isPass = false
    }
  } else {
    if (!value.from) {
      error = { from: true, to: false }
      isPass = false
    }
  }
  return { error, isPass }
}

export const isDateValidate = ({ date, setDate, time, setTime, isRange }: dateValidate) => {
  let isvalidate = true
  let dateError = checkDateError({ value: date, isRange })
  let timeError = checkDateError({ value: time, isRange })
  if (!dateError.isPass) {
    setDate({ ...date, error: dateError.error })
    isvalidate = false
  }
  if (!timeError.isPass) {
    setTime({ ...time, error: timeError.error })
    isvalidate = false
  }
  return isvalidate
}

export const isStateValidate = (allState: stateProps, doDispatch: React.Dispatch<actionProps>) => {
  let localErrorTab = -1
  const checkErrorTab = (old: number, newT: number) => {
    if (old === -1) {
      return newT
    }
    return old
  }
  let isPass = true
  for (let k in allState) {
    allState[k].forEach((item) => {
      if ((item.type === 'ban_mobile_img_id' || item.type === 'ban_web_img_id') && !item.payload.id) {
        doDispatch({
          lang: parseInt(k),
          act: 'update',
          type: item.type,
          payload: { ...item.payload, error: { empty: true, limit: false } },
        })
        isPass = false
        localErrorTab = checkErrorTab(localErrorTab, parseInt(k))
      }
      if (item.type === 'ban_title' && !item.payload.value) {
        doDispatch({ lang: parseInt(k), act: 'update', type: item.type, payload: { ...item.payload, error: true } })
        isPass = false
        localErrorTab = checkErrorTab(localErrorTab, parseInt(k))
      }
    })
  }
  return {
    localErrorTab,
    isPass,
  }
}

export const formatDate = (date: Date, time: string) => {
  return format(date, 'yyyy/MM/dd') + ' ' + time
}
