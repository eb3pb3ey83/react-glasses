import * as yup from 'yup'

export default (password: string, required: string) =>
  yup
    .string()
    .required(required)
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){8,10}$/, password)
