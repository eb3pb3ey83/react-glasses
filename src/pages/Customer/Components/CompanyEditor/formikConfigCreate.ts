import { UseMutateFunction } from 'react-query'
import * as yup from 'yup'
import { FormikConfig } from 'src/shared/components/FormikForm/formikConfig'
import { CreateCompanyOrDealerModel } from '../../services/createCompanyOrDealer/model'
import { CreateModeConfig, FormSchemaCreate, FormSchemaEdit } from './model'
import emailValidator from 'src/utils/validator/emailValidator'
import { TFunction } from 'react-i18next'
import { FormikHelpers } from 'formik'
import formikValidate from 'src/utils/validator/formikValidate'
import { Errors } from 'src/core/services/base/handleFailure/model'

export default class CompanyFormCreateConfig extends FormikConfig<FormSchemaCreate | FormSchemaEdit> {
  constructor(
    private mutate: UseMutateFunction<unknown, Errors, CreateCompanyOrDealerModel, unknown>,
    private t: TFunction<'translation'>,
    private createModeConfig: CreateModeConfig,
  ) {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  public validationSchema = yup.object().shape({
    company_name: yup.string().required(this.t('validation.required')),
    email: emailValidator(this.t('company.emailFormatFail'), this.t('validation.required'), this.t('company.emailDuplicated')),
    user_name: yup.string().required(this.t('validation.required')),
  })

  validate = (val: FormSchemaCreate | FormSchemaEdit) => {
    return formikValidate(val, this.validationSchema, { emailDupli: this.createModeConfig.isEmailErr })
  }
  public initialValues: FormSchemaCreate = {
    company_model: '1',
    job_title: '',
    email: '',
    user_name: '',
    company_name: '',
    company_no: '',
  }

  public onSubmit(data: FormSchemaCreate, formikHelpers: FormikHelpers<FormSchemaCreate | FormSchemaEdit>) {
    const { setFormikHelpers } = this.createModeConfig

    if (data.job_title === '') {
      data.job_title = null
    }

    this.mutate(data)
    setFormikHelpers(formikHelpers)
  }
}
