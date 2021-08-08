/* eslint-disable react/react-in-jsx-scope */
import { Formik } from 'formik'
import { Props } from './model'

function FormikForm<FormSchema>({ formikConfig, children }: Props<FormSchema>) {
  const { onSubmit, ...restConfig } = formikConfig

  return (
    <Formik {...restConfig} onSubmit={onSubmit}>
      {children}
    </Formik>
  )
}

export default FormikForm
