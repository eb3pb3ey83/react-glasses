import isPlainObject from 'lodash/fp/isPlainObject'
import toCaseKeys from '../../../../utils/to-case-keys'
import { dataArray, dataObject } from '../../../../shared/types/data.type'
import getOption from '../getOption'

export default function handleParameter(parameter: dataObject): dataObject {
  const objectComparator = (value: dataObject | dataArray) => isPlainObject(value) || Array.isArray(value)
  const casedParameter = toCaseKeys(parameter, getOption().toRequestCase, { objectComparator })

  return {
    ...casedParameter,
    timestamp: new Date().getTime(),
  }
}
