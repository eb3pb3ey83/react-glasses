import { validateYupSchema, yupToFormErrors } from 'formik'
import { useTranslation } from 'react-i18next'
import { FormSchema } from 'src/pages/Customer/Components/AccountEditor/model'
import { RequestProps } from 'src/pages/Product/services/createOtherProduct/model'
import { RolesIndexType } from 'src/shared/components/FormikCheckBoxGroup/model'
import { AnySchema, array, object, ObjectSchema, string, number } from 'yup'
import { ObjectShape } from 'yup/lib/object'
import Reference from 'yup/lib/Reference'
import emailValidator from './emailValidator'

//Formik props:
//validate={(val) => formikValidate(val, accountSchema, { emailDupli: isEmailErr })}
//values are formikSchema, yupSchema is yup object shape, context is yup's context

export default <FormSchema = Record<string, unknown>>(
  values: FormSchema,
  yupSchema: ObjectSchema<ObjectShape>,
  context?: Record<string, unknown>,
) => {
  try {
    validateYupSchema<FormSchema>(values, yupSchema, true, context)
  } catch (err) {
    return yupToFormErrors(err)
  }
  return {}
}

export const useAccountValidate = () => {
  const { t } = useTranslation()
  const accountValidate = (values: FormSchema, context?: { [key: string]: unknown }) => {
    let param = values.role_type === '1' ? 'roles1' : values.role_type === '2' ? 'roles2' : 'roles3'
    let schema: Record<string, AnySchema | Reference> = {
      name: string().required(t('validation.required')),
      email: emailValidator(t('company.emailFormatFail'), t('validation.required'), t('company.emailDuplicated')),
      role_type: string().nullable().required(t('validation.required')),
    }
    schema[param as RolesIndexType] = array().min(1, t('company.roleError'))
    const validSchema = object().shape(schema)
    try {
      validateYupSchema<FormSchema>(values, validSchema, true, context)
    } catch (err) {
      return yupToFormErrors(err)
    }
    return {}
  }
  return { accountValidate }
}

export const useProductValidate = () => {
  const { t } = useTranslation()
  const productValidate = (values: RequestProps, context?: { [key: string]: unknown }) => {
    let schema: Record<string, AnySchema | Reference> = {
      country_type: string().required(t('validation.required')),
      status: string().required(t('validation.required')),
      market_type: string().required(t('validation.required')), //Y
      package_unit: string().required(t('validation.required')), //Y
      brand_code: string().required(t('validation.required')), //Y
      product_no: string().required(t('validation.required')), //Y
      package_amt: number().required(t('validation.required')), //Y
      infos: array(
        object({
          product_name: string().required(t('validation.required')),
          product_info: string().required(t('validation.required')),
          images: array().of(number()).min(1, t('product.photoMinError')),
        }),
      ),
    }
    const validSchema = object().shape(schema)
    try {
      validateYupSchema<RequestProps>(values, validSchema, true, context)
    } catch (err) {
      return yupToFormErrors(err)
    }
    return {}
  }
  return { productValidate }
}
