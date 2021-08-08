import { AxiosResponse } from 'axios'
import { dataArray, dataObject } from '../shared/types/data.type'

type ApiResponse = dataObject | dataArray | AxiosResponse<dataObject>
interface Options {
  isDeep?: boolean
  exclude?: string[]
  objectComparator(value: unknown): boolean
}

const isObject = (value: unknown) => value !== null && (typeof value === 'function' || typeof value === 'object')

const matches = (patterns: string[] | RegExp[], value: string | RegExp) =>
  patterns.some((pattern: string | RegExp) => (typeof pattern === 'string' ? pattern === value : pattern.test(value as string)))

function toPredicateValues(object: ApiResponse, predicator: (arg?: unknown) => unknown, options?: Options): ApiResponse | string | number | boolean {
  const isArray = Array.isArray(object)

  const newOptions = {
    ...options,
    ...{ isDeep: true, exclude: [], objectComparator: isObject },
  }

  if (!newOptions.objectComparator(object)) return object

  const newObject: dataObject = {}
  const newArray: dataArray = []

  Object.entries(object).forEach(([key, value]) => {
    const isDeep = !matches(newOptions.exclude, key) || newOptions.isDeep

    // eslint-disable-next-line default-case
    switch (true) {
      case isDeep && isArray:
        newArray[Number(key)] = toPredicateValues(value as dataArray, predicator, newOptions)
        break
      case !isDeep && isArray:
        newArray[Number(key)] = value
        break
      case isDeep && !isArray:
        newObject[key] = toPredicateValues(value as dataObject, predicator, newOptions)
        break
      case !isDeep && !isArray:
        newObject[key] = value
        break
    }
  })

  return isArray ? (predicator(newArray) as dataArray) : (predicator(newObject) as dataObject)
}

export default toPredicateValues
