import { FormikErrors, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

export abstract class FormikConfig<formikSchema> {
  enableReinitialize = true
  validateOnChange = false
  validateOnBlur = false
  validationSchema?: yup.ObjectSchema<ObjectShape>
  validate?: (values: formikSchema) => void | Record<string, unknown> | Promise<FormikErrors<formikSchema>>
  abstract initialValues: formikSchema
  abstract onSubmit(data: formikSchema, formikHelpers: FormikHelpers<formikSchema>): void
}
