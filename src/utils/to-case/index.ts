import toCamelCase from './to-camel-case'
import toSnakeCase from './to-snake-case'
import toSpaceCase from './to-space-case'
import toUpperCase from './to-upper-case'

const to = {
  camel: toCamelCase,
  snake: toSnakeCase,
  space: toSpaceCase,
  upper: toUpperCase,
}

const CASES: {
  CAMEL: 'camel'
  SNAKE: 'snake'
  SPACE: 'space'
  UPPER: 'upper'
} = {
  CAMEL: 'camel',
  SNAKE: 'snake',
  SPACE: 'space',
  UPPER: 'upper',
}

export { toCamelCase, toSnakeCase, toSpaceCase, toUpperCase, CASES }
export default to
