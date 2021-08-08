import { UseMutateFunction } from 'react-query'
import * as yup from 'yup'
import { FormikConfig } from 'src/shared/components/FormikForm/formikConfig'
import { CreateCompanyOrDealerModel } from '../../services/createCompanyOrDealer/model'
import { FormConfig, FormSchemaCreate, FormSchemaEdit } from './model'
import emailValidator from 'src/utils/validator/emailValidator'
import { TFunction } from 'react-i18next'
import formikValidate from 'src/utils/validator/formikValidate'
import { FormikHelpers } from 'formik'
import phoneValidator from 'src/utils/validator/phoneValidator'

export default class CompanyFormCreateConfig extends FormikConfig<FormSchemaCreate | FormSchemaEdit> {
  constructor(
    private mutate: UseMutateFunction<unknown, unknown, CreateCompanyOrDealerModel, unknown>,
    private t: TFunction<'translation'>,
    private formConfig: FormConfig,
  ) {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  public validationSchema = yup.object().shape({
    company_name: yup.string().required(this.t('validation.required')),
    tel: phoneValidator(this.t('validation.phoneInvalid'), this.t('validation.required')),
    email: emailValidator(this.t('validation.emailInvalid'), this.t('validation.required')),
    user_name: yup.string().required(this.t('validation.required')),
  })
  public initialValues: FormSchemaCreate = {
    company_model: '2',
    company_name: '',
    tel: '',
    job_title: '',
    email: '',
    user_name: '',
    order_chk: '0',
    parent_id: this.formConfig.companyId,
  }

  validate = (val: FormSchemaCreate | FormSchemaEdit) => {
    return formikValidate(val, this.validationSchema, { emailDupli: this.formConfig.isEmailErr })
  }

  public onSubmit(data: FormSchemaCreate, formikHelpers: FormikHelpers<FormSchemaCreate | FormSchemaEdit>) {
    const { setFormikHelpers } = this.formConfig

    if (data.job_title === '') {
      data.job_title = null
    }

    this.mutate(data)
    setFormikHelpers && setFormikHelpers(formikHelpers)
  }
}
