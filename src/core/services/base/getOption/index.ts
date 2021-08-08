import { CASES } from '../../../../utils/to-case-keys'

export interface ResponseCaseOption {
  toResponseCase: 'camel' | 'space' | 'snake' | 'upper'
  toRequestCase: 'camel' | 'space' | 'snake' | 'upper'
}
export default function getOption(): ResponseCaseOption {
  return {
    toResponseCase: CASES.CAMEL,
    toRequestCase: CASES.SNAKE,
  }
}
