import { AxiosResponse } from 'axios'
import { dataArray, dataObject } from '../shared/types/data.type'
import to, { CASES } from './to-case'

type ApiResponse = dataObject | dataArray | AxiosResponse<dataObject>
interface Options {
  isDeep?: boolean
  exclude?: string[]
  objectComparator(value: unknown): boolean
}

const isObject = (value: unknown) => value !== null && (typeof value === 'function' || typeof value === 'object')

const matches = (patterns: string[] | RegExp[], value: string | RegExp) =>
  patterns.some((pattern: string | RegExp) => (typeof pattern === 'string' ? pattern === value : pattern.test(value as string)))

function toCaseKeys(object: ApiResponse, toCase: 'camel' | 'space' | 'snake' | 'upper', options?: Options): ApiResponse {
  if (!Object.values(CASES).includes(toCase)) {
    throw new Error('There is not the type of case converter.')
  }

  const isArray = Array.isArray(object)

  const newOptions = {
    ...options,
    ...{ isDeep: true, exclude: [], objectComparator: isObject },
  }

  if (!newOptions.objectComparator(object)) return object

  const converter = to[toCase]
  const newObject: dataObject = {}
  const newArray: dataArray = []

  Object.entries(object).forEach(([key, value]) => {
    const newKey = matches(newOptions.exclude, key) ? key : converter(key)
    const newValue = newOptions.isDeep ? toCaseKeys(value as dataObject, toCase, newOptions) : value

    if (isArray) {
      newArray[Number(newKey)] = newValue
    } else {
      newObject[newKey] = newValue
    }
  })

  return isArray ? newArray : newObject
}

export { CASES }
export default toCaseKeys
