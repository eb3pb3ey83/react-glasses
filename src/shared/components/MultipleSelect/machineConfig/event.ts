import { Items } from '../model'

type InputClick = { type: 'INPUT_CLICK' }
export type SubmittedList = {
  type: 'SET_SUBMITTED_LIST'
  submittedList: Items[]
}

export type Events = InputClick | SubmittedList
