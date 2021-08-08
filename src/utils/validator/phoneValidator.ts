import * as yup from 'yup'

export const rule = /^\+(\d{1,3})[\s\-](\d{1,3})[\s\-](\d{1,4})\-(\d{1,4})$/

export default (phoneMessage: string, requiredMessage: string) => {
  return yup.string().required(requiredMessage).matches(rule, phoneMessage)
}
