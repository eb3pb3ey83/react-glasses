import { hasSpacesWithWord } from './regexes'
import toSpaceCase from './to-space-case'

function toCamelCase(words: string): string {
  return toSpaceCase(words).replace(hasSpacesWithWord, (_matches, letter) => letter.toUpperCase())
}

export default toCamelCase
