import { UseMutateFunction } from 'react-query'
import * as yup from 'yup'
import { FormikConfig } from 'src/shared/components/FormikForm/formikConfig'
import { CreateCompanyOrDealerModel } from '../../services/createCompanyOrDealer/model'
import { EditModeConfig, FormSchemaCreate, FormSchemaEdit } from './model'
import { TFunction } from 'react-i18next'

export default class CompanyFormEditConfig extends FormikConfig<FormSchemaCreate | FormSchemaEdit> {
  constructor(
    private mutate: UseMutateFunction<unknown, unknown, CreateCompanyOrDealerModel, unknown>,
    private t: TFunction<'translation'>,
    private editModeConfig: EditModeConfig,
  ) {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  public validationSchema = yup.object().shape({
    user_id: yup.string().required(this.t('validation.required')),
  })

  public initialValues: FormSchemaEdit = {
    company_model: '1',
    company_name: this.editModeConfig.company_name,
    customer_id: Number(this.editModeConfig.companyId),
    user_id: null,
  }

  public onSubmit(data: FormSchemaEdit) {
    this.editModeConfig.openAlert({
      title: this.t('company.confirmChangeUser'),
      content: this.t('company.confirmChangeUserDetail', { account: this.editModeConfig.adminName }),
      isDicidedMode: true,
      onConfirm: () => {
        this.mutate(data)
        this.editModeConfig.closeDrawer()
      },
    })
  }
}
