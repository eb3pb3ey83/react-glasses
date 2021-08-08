import { Box, FormHelperText, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { TableContext } from 'src/shared/components/TableProvider/model'
import { FormSchemaCreate, FormSchemaEdit, Props } from './model'
import { useAreaValue } from 'src/shared/hooks/useAreaValue'
import Area from 'src/shared/components/Area'
import FormikForm from 'src/shared/components/FormikForm'
import CompanyFormCreateConfig from './formikConfigCreate'
import Divider from 'src/shared/components/Divider'
import ERPSelector from './components/ERPSelector'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { Form, FormikHelpers } from 'formik'
import { useCreateCompanyOrDealer } from '../../services/createCompanyOrDealer/hooks'
import { useHistory, useParams } from 'react-router-dom'
import CreateModeForm from './components/CreateModeForm'
import EditModeForm from './components/EditModeForm'
import CompanyFormEditConfig from './formikConfigEdit'
import Loading from 'src/shared/components/Loading'
import Alert from 'src/shared/components/Alert'
import { useUpdateCompanyOrDealer } from '../../services/updateCompanyOrDealer/hooks'
import authConfig from 'src/utils/authConfig'
import useStyles from './useStyles'

const hasAddPermission = authConfig.getPermissions('company:add')
const hasEditPermission = authConfig.getPermissions('company:upd')

const CompanyEditor: React.FC<Props> = ({ isCreate = false, companyName, companyNo }) => {
  const { closeDrawer: creatorCloseDrawer, openToast } = React.useContext(TableContext)
  const { areaValue, setAreaValue } = useAreaValue()
  const [formikHelpers, setFormikHelpers] = React.useState<FormikHelpers<FormSchemaCreate | FormSchemaEdit> | ''>('')
  const [isEmailErr, setIsEmailErr] = React.useState(false)
  const [adminName, setAdminName] = React.useState('')
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { t } = useTranslation()
  const { mutate: createCompany } = useCreateCompanyOrDealer({
    closeDrawer: creatorCloseDrawer,
    openToast,
    setIsEmailErr,
    isDealer: false,
  })
  const history = useHistory()
  const { companyId } = useParams<{ companyId: string }>()

  const editorCloseDrawer = () => {
    history.push(`/pages/customermanagement/company/${companyId}`)
  }

  const { mutate: updateCompanyUser } = useUpdateCompanyOrDealer(openToast)
  const company_name = companyName as string

  const formikConfig = isCreate
    ? new CompanyFormCreateConfig(createCompany, t, {
        isEmailErr,
        setFormikHelpers,
        closeDrawer: creatorCloseDrawer,
      })
    : new CompanyFormEditConfig(updateCompanyUser, t, { company_name, companyId, openAlert, adminName, closeDrawer: editorCloseDrawer })

  const classes = useStyles()
  const onClose = isCreate ? creatorCloseDrawer : editorCloseDrawer

  React.useEffect(() => {
    if (isEmailErr && formikHelpers && openToast) {
      openToast(t('toast.formhasErrors'))
      formikHelpers && formikHelpers.validateForm()
      formikHelpers.setSubmitting(false)
      setIsEmailErr(false)
    }
  }, [openToast, isEmailErr, formikHelpers])

  if (!isCreate && !companyNo) {
    return <Loading />
  }

  return (
    <InfoDrawer.Container title={isCreate ? t('company.addCompany') : t('company.editCompany')} open onClose={onClose} width='500px'>
      <Alert
        isDicidedMode={alertMessage.isDicidedMode as boolean}
        onConfirm={alertMessage.onConfirm}
        onClose={closeAlert}
        open={isAlertOpen}
        title={alertMessage.title}
        content={alertMessage.content}
      />
      <FormikForm<FormSchemaEdit | FormSchemaCreate> formikConfig={formikConfig}>
        {() => (
          <Form>
            <InfoDrawer.Content>
              <Typography variant='h6' className={`${classes.title} ${classes.firstTitle}`}>
                {t('company.dealerCreateTitle')}
              </Typography>
              <Area isCreatePage={isCreate} areaValue={areaValue} setAreaValue={setAreaValue} disabled={!hasAddPermission || Boolean(!isCreate)}>
                <Box marginBottom='33px'>
                  <FormHelperText className={classes.label}>{t('company.source')}</FormHelperText>
                  <ERPSelector
                    disabled={!isCreate || !hasAddPermission}
                    openAlert={openAlert}
                    companyNo={companyNo}
                    isCreate={isCreate}
                    country_type={areaValue as string}
                  />
                </Box>
                <Divider margin={32} />
                {isCreate ? <CreateModeForm /> : <EditModeForm onAdminNameFetched={(name) => setAdminName(name)} />}
              </Area>
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

export default CompanyEditor
