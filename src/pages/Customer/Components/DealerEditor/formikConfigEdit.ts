import { UseMutateFunction } from 'react-query'
import * as yup from 'yup'
import { FormikConfig } from 'src/shared/components/FormikForm/formikConfig'
import { CreateCompanyOrDealerModel } from '../../services/createCompanyOrDealer/model'
import { FormConfig, FormSchemaCreate, FormSchemaEdit } from './model'
import { TFunction } from 'react-i18next'
import phoneValidator from 'src/utils/validator/phoneValidator'

export default class CompanyFormEditConfig extends FormikConfig<FormSchemaCreate | FormSchemaEdit> {
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
  })

  public initialValues: FormSchemaEdit = {
    company_model: '2',
    company_name: this.formConfig.company_name || '',
    open_flag: this.formConfig.open_flag || '',
    tel: this.formConfig.tel || '',
    order_chk: this.formConfig.order_chk || '',
    customer_id: this.formConfig.companyId,
  }

  public onSubmit(data: FormSchemaEdit) {
    this.mutate(data)
    this.formConfig.closeDrawer()
  }
}
