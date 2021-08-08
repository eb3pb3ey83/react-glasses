import qs from 'qs'
import { useLocation } from 'react-router-dom'
import { stringObject } from 'src/shared/types/data.type'

const tryParseInt = (value: string) => {
  const result = parseInt(value)
  return isNaN(result) ? value : String(result)
}

const parseObjectValues = (obj: stringObject = {}) => {
  Object.keys(obj).forEach((k) => {
    obj[k] = tryParseInt(obj[k])
  })

  return obj
}

const useQuery = () => {
  const location = useLocation()
  const value = parseObjectValues(qs.parse(location.search, { ignoreQueryPrefix: true }) as stringObject)

  return value
}

export default useQuery
