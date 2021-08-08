import { separatorSplitter } from './regexes'
import toNoCase from './to-no-case'

function toSpaceCase(words: string): string {
  return toNoCase(words).replace(separatorSplitter, (_matches, match) => (match ? ` ${match}` : '')).trim() // prettier-ignore
}

export default toSpaceCase
