import flow from 'lodash/fp/flow'
import omitBy from 'lodash/fp/omitBy'
import mapValues from 'lodash/fp/mapValues'
import isUndefined from 'lodash/fp/isUndefined'
import { dataArray, dataObject, valueType } from '../../../../shared/types/data.type'
import match from '../../../../utils/match'

export default function getPredicator(data: dataObject | dataArray): (arg?: unknown) => unknown {
  const isArray = Array.isArray(data)
  const isObject = !Array.isArray(data)

  const handleArrayParameter = (array: unknown[]) => {
    return array.filter((value) => !isUndefined(value))
  }

  const handleObjectParameter = (object: dataObject) => {
    return flow(
      omitBy(isUndefined),
      mapValues((value: valueType) => (typeof value === 'string' ? value.trim() : value)),
    )(object)
  }

  return match({ condition: isArray, method: handleArrayParameter }).otherwise({ condition: isObject, method: handleObjectParameter })
}
