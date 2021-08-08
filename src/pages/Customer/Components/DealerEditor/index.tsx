import { Box, FormHelperText, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import CompanyFormCreateConfig from './formikConfigCreate'
import CompanyFormEditConfig from './formikConfigEdit'
import { FormSchemaCreate, FormSchemaEdit, Props } from './model'
import { Form, FormikHelpers } from 'formik'
import { useCreateCompanyOrDealer } from '../../services/createCompanyOrDealer/hooks'
import { TableContext } from 'src/shared/components/TableProvider/model'
import FormikForm from 'src/shared/components/FormikForm'
import FormikField from 'src/shared/components/FormikField'
import FormikSwitch from 'src/shared/components/FormikSwitch'
import Divider from 'src/shared/components/Divider'
import CreateModeForm from './components/CreateModeForm'
import { PermissionInfo } from 'src/shared/components/Info'
import OpenFlag, { OpenFlagProvider } from '../OpenFlag'
import EditModeForm from './components/EditModeForm'
import { useUpdateCompanyOrDealer } from '../../services/updateCompanyOrDealer/hooks'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import useGetCompanyDetail from '../../services/getCompanyDetail/hooks'
import { CompanyDetail } from '../../services/getCompanyDetail/model'
import Loading from 'src/shared/components/Loading'
import authConfig from 'src/utils/authConfig'
import useStyles from './useStyles'

const hasAddPermission = authConfig.getPermissions('company:add')
const hasEditPermission = authConfig.getPermissions('company:upd')

const DealerEditor: React.FC<Props> = ({ isCreate = false }) => {
  const { openToast } = React.useContext(TableContext)
  const { t } = useTranslation()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const [formikHelpers, setFormikHelpers] = React.useState<FormikHelpers<FormSchemaCreate | FormSchemaEdit> | ''>('')
  const [isEmailErr, setIsEmailErr] = React.useState(false)
  const classes = useStyles()
  const history = useHistory()
  const { companyId, dealerid } = useParams<{ companyId: string; dealerid: string }>()
  const { response: companyDetailResponse, isFetched } = useGetCompanyDetail({ customer_id: dealerid, company_model: '2' }, isCreate)

  const creatorCloseDrawer = () => {
    history.push(`/pages/customermanagement/company/${companyId}`)
  }

  // const { mutate: createDealer } = useCreateCompanyOrDealer(openToast, setIsToastError, true)
  const { mutate: createDealer } = useCreateCompanyOrDealer({
    closeDrawer: creatorCloseDrawer,
    openToast,
    setIsEmailErr,
    isDealer: true,
  })

  const editorCloseDrawer = () => {
    history.push(`/pages/customermanagement/company/${companyId}/dealer/${dealerid}`)
  }

  const { mutate: updateCompanyDealer } = useUpdateCompanyOrDealer(openToast)
  const response = companyDetailResponse?.data.result_data as CompanyDetail

  const formikConfig = isCreate
    ? new CompanyFormCreateConfig(createDealer, t, { isEmailErr, companyId, closeDrawer: creatorCloseDrawer, setFormikHelpers })
    : new CompanyFormEditConfig(updateCompanyDealer, t, { companyId: dealerid, closeDrawer: editorCloseDrawer, ...response })

  const onClose = isCreate ? creatorCloseDrawer : editorCloseDrawer

  React.useEffect(() => {
    if (isEmailErr && formikHelpers && openToast) {
      openToast(t('toast.formhasErrors'))
      formikHelpers && formikHelpers.validateForm()
      formikHelpers.setSubmitting(false)
      setIsEmailErr(false)
    }
  }, [openToast, isEmailErr, formikHelpers])

  if (!isFetched && !isCreate) {
    return <Loading />
  }

  return (
    <InfoDrawer.Container title={isCreate ? t('company.dealerCreateTitle') : t('company.dealerEditTitle')} open onClose={onClose} width='500px'>
      <Alert
        isDicidedMode={alertMessage.isDicidedMode as boolean}
        onConfirm={alertMessage.onConfirm}
        onClose={closeAlert}
        open={isAlertOpen}
        title={alertMessage.title}
        content={alertMessage.content}
      />
      <FormikForm<FormSchemaCreate | FormSchemaEdit> formikConfig={formikConfig}>
        {() => (
          <Form>
            <InfoDrawer.Content>
              <Typography variant='h6' className={classes.title}>
                {t('company.dealerTitle')}
              </Typography>
              <FormikField
                disabled={isCreate ? !hasAddPermission : !hasEditPermission}
                placeholder={t('company.dealerNamePlaceholder')}
                label={t('company.dealerName')}
                name='company_name'
              />
              <FormikField
                disabled={isCreate ? !hasAddPermission : !hasEditPermission}
                placeholder={t('company.dealerPhonePlaceholder')}
                label={t('company.dealerPhone')}
                name='tel'
              />
              <FormHelperText className={classes.label}>
                <span className={classes.labelWithSuffix}>{t('company.dealerPermission')}</span>
                <PermissionInfo />
              </FormHelperText>
              <Box marginBottom={isCreate ? '32px' : '0'}>
                <FormikSwitch
                  disabled={isCreate ? !hasAddPermission : !hasEditPermission}
                  labelClassName={classes.switchLabel}
                  className={classes.switch}
                  name='order_chk'
                  label={t('company.dealerPermissionSwitch')}
                />
              </Box>
              {!isCreate && (
                <OpenFlagProvider
                  value={{
                    openAlert,
                    closeAlert,
                    alertTitle: t('alert.turnOffOpenFlagTitle'),
                    alertContent: t('alert.turnOffOpenFlagDescription'),
                    isAlwaysConfirm: false,
                    buttonLabel: t('alert.turnOffOpenBtn'),
                  }}
                >
                  <OpenFlag disabled={isCreate ? !hasAddPermission : !hasEditPermission} />
                </OpenFlagProvider>
              )}
              <Divider margin={32} />
              {isCreate ? <CreateModeForm /> : <EditModeForm />}
            </InfoDrawer.Content>
            {(isCreate ? hasAddPermission : hasEditPermission) && (
              <InfoDrawer.Footer>
                <Box display='flex' justifyContent='flex-end'>
                  <Box>
                    <Button onClick={onClose} width={100} height={40} isWhiteButton fullWidth={false} type='button'>
                      {t('button.cancel')}
                    </Button>
                    <Button className={classes.saveButton} width={100} height={40} fullWidth={false} type='submit'>
                      {isCreate ? t('button.addbutton') : t('button.save')}
                    </Button>
                  </Box>
                </Box>
              </InfoDrawer.Footer>
            )}
          </Form>
        )}
      </FormikForm>
    </InfoDrawer.Container>
  )
}

export default DealerEditor
