import { hasSpaces } from './regexes'
import toSpaceCase from './to-space-case'

function toSnakeCase(words: string): string {
  return toSpaceCase(words).replace(hasSpaces, '_')
}

export default toSnakeCase
