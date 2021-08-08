import { separatorSplitter, camelSplitter, hasSpace, hasSeparator, hasCamel } from './regexes'

function unseparate(words: string) {
  return words.replace(separatorSplitter, (_match, next) => (next ? ` ${next}` : ''))
}

function uncamelize(words: string) {
  return words.replace(camelSplitter, (_match, previous, uppers) => `${previous} ${uppers.toLowerCase().split('').join(' ')}`) // prettier-ignore
}

function toNoCase(words: string): string {
  let result = ''

  switch (true) {
    case hasSpace.test(words):
      result = words
      break

    case hasSeparator.test(words):
      result = unseparate(words) || words
      break

    case hasCamel.test(words):
      result = uncamelize(words)
      break

    default:
      result = words
      break
  }

  return result.toLowerCase()
}

export default toNoCase
