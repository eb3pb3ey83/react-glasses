import { format } from 'date-fns'
import { actionProps, stateProps } from '../components/FormContent/model'
import { dateValidate, emptyP, setDateError, setDateErrorT } from './model'

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
  let localErrorTab: null | number = null
  const checkErrorTab = (old: number | null, newT: number) => {
    if (old === null) {
      return newT
    }
    return old
  }
  let localContentEmpty: emptyP = {}
  let isPass = true
  for (let k in allState) {
    let isEmpty = true
    allState[k].forEach((item, idx, arr) => {
      if (Number(item.type) === 2 && item.sort === 1 && !item.payload.id) {
        doDispatch({
          lang: parseInt(k),
          act: 'update',
          type: Number(item.type) as 0 | 1 | 2 | 3,
          sort: item.sort,
          payload: { ...item.payload, error: { empty: true, limit: false } },
        })
        isPass = false
        localErrorTab = checkErrorTab(localErrorTab, parseInt(k))
      }
      if (Number(item.type) === 0 && !item.payload.value) {
        doDispatch({ lang: parseInt(k), act: 'update', type: 0, sort: item.sort, payload: { ...item.payload, error: true } })
        isPass = false
        localErrorTab = checkErrorTab(localErrorTab, parseInt(k))
      }
      if (arr.length > 2 && idx >= 2) {
        if (Number(item.type) === 2 && item.payload.id) isEmpty = false
        if (Number(item.type) === 1 && item.payload.value) isEmpty = false
        if (Number(item.type) === 3 && item.payload.url) isEmpty = false
        if (isEmpty) {
          localContentEmpty = {
            ...localContentEmpty,
            [k]: true,
          }
          isPass = false
        }
      }
    })
    if (allState[k].length === 2) {
      localContentEmpty = {
        ...localContentEmpty,
        [k]: true,
      }
      localErrorTab = checkErrorTab(localErrorTab, parseInt(k))
      isPass = false
    }
  }
  return {
    localErrorTab,
    isPass,
    localContentEmpty,
  }
}

export const isStateValidate_notNews = (allState: stateProps, doDispatch: React.Dispatch<actionProps>) => {
  let localErrorTab: null | number = null
  const checkErrorTab = (old: number | null, newT: number) => {
    if (old === null) {
      return newT
    }
    return old
  }
  let localContentEmpty: emptyP = {}
  let isPass = true
  for (let k in allState) {
    let isEmpty = true
    allState[k].forEach((item, idx, arr) => {
      if (Number(item.type) === 0 && !item.payload.value) {
        doDispatch({ lang: parseInt(k), act: 'update', type: 0, sort: item.sort, payload: { ...item.payload, error: true } })
        isPass = false
        localErrorTab = checkErrorTab(localErrorTab, parseInt(k))
      }
      if (arr.length > 1 && idx >= 1) {
        if (Number(item.type) === 2 && item.payload.id) isEmpty = false
        if (Number(item.type) === 1 && item.payload.value) isEmpty = false
        if (Number(item.type) === 3 && item.payload.url) isEmpty = false
        if (isEmpty) {
          localContentEmpty = {
            ...localContentEmpty,
            [k]: true,
          }
          isPass = false
        }
      }
    })
    if (allState[k].length === 1) {
      localContentEmpty = {
        ...localContentEmpty,
        [k]: true,
      }
      localErrorTab = checkErrorTab(localErrorTab, parseInt(k))
      isPass = false
    }
  }
  return {
    localErrorTab,
    isPass,
    localContentEmpty,
  }
}

export const formatDate = (date: Date, time: string) => {
  return format(date, 'yyyy/MM/dd') + ' ' + time
}
