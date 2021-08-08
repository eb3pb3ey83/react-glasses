import React, { useEffect } from 'react'
import { Box, FormHelperText } from '@material-ui/core'
import { Formik, FormikHandlers, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router'
import Button from 'src/shared/components/Button'
import FormikField from 'src/shared/components/FormikField'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { FormSchema, Props, RolesAllType, RolesType } from './model'
import FormikSwitch from 'src/shared/components/FormikSwitch'
import { TableContext } from 'src/shared/components/TableProvider/model'
import { useCreateCustomer } from '../../services/createCustomer/hooks'
import AccountInherit from './Components/AccountInherit'
import RoleTypeWithPermission from './Components/RoleTypeWithPermission'
import useGetCustomerDetail from '../../services/getCustomerDetail/hooks'
import RoleWithInheritBtn from './Components/RoleWithInheritBtn'
import { useUpdateCustomer } from '../../services/updateCutomer/hooks'
import authConfig from 'src/utils/authConfig'
import Info from 'src/shared/components/Info'
import EmailSender from 'src/shared/components/EmailSender'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useSendOpeningAccount from 'src/shared/services/accountOpen/hooks'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import Form from 'src/shared/components/FormikForm/Form'
import { useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { useAccountValidate } from 'src/utils/validator/formikValidate'
import OpenFlag, { OpenFlagProvider } from '../OpenFlag'
import { flagValues, setFlagValues } from '../OpenFlag/model'
import { Resultdatum } from '../../services/getCustomerPermission/model'
import { getCustomerPermission } from '../../services/getCustomerPermission'
import { transformDataToCheckBox } from '../../utils/transformDataToCheckBox'
import RoleCheckBoxGroup from './Components/RoleCheckBoxGroup'
import useStyles from './useStyles'
import { useDiscardEdit } from 'src/utils/discardEdit'

const hasAddPermission = authConfig.getPermissions('company:add')
const hasEditPermission = authConfig.getPermissions('company:upd')
const hasEmailPermission = authConfig.getPermissions('company:send')

const AccountEditor: React.FC<Props> = ({ isCompany = true, isCreate = false }) => {
  const classes = useStyles()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { doFormCancel } = useDiscardEdit(openAlert, closeAlert, closeDrawer)
  const { language } = useLanguage()
  const { openToast, setIsToastError } = React.useContext(TableContext)
  const { mutate } = useCreateCustomer()
  const { mutate: updateCustomer } = useUpdateCustomer(closeDrawer, openToast)
  const [isOpen, setIsOpen] = React.useState(true)
  const [openInheritAccount, setOpenInheritAccount] = React.useState(false)
  const { companyId, accountid, dealerid } = useParams<{ companyId: string; accountid?: string; dealerid?: string }>()
  const [formikInit, setFormikInit] = React.useState<FormSchema>({
    name: '',
    email: '',
    job_title: '',
    role_type: null,
    noNeedVerify: '0',
    hasEditAuth: '0',
    roles1: [],
    roles1_all: {},
    roles2: [],
    roles2_all: {},
    roles3: [],
    roles3_all: {},
  })
  const { accountValidate } = useAccountValidate()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const history = useHistory()
  const { response } = useGetCustomerDetail(accountid)
  const accountData = response?.data.result_data

  const roleRadios = React.useMemo(
    () => [
      {
        label: t('company.admin'),
        value: '1',
      },
      {
        label: t('select.customerAuthorityManager'),
        value: '2',
      },
      {
        label: t('select.customerAuthorityUser'),
        value: '3',
      },
    ],
    [language],
  )

  const [roles_type1, setRoles_type1] = React.useState<Resultdatum[]>([])
  const [roles_type2, setRoles_type2] = React.useState<Resultdatum[]>([])
  const [roles_type3, setRoles_type3] = React.useState<Resultdatum[]>([])

  React.useEffect(() => {
    const fetchCusPermission = (role_type: '1' | '2' | '3', retryCounts = 0) => {
      const doSet = role_type === '1' ? setRoles_type1 : role_type === '2' ? setRoles_type2 : setRoles_type3
      if (retryCounts >= 3) return doSet([])
      return getCustomerPermission({ data_type: '2', company_model: isCompany ? '1' : '2', role_type }, language)
        .then((data) => {
          doSet(data.data.result_data)
          retryCounts++
        })
        .catch(() => {
          fetchCusPermission(role_type, retryCounts++)
        })
    }
    fetchCusPermission('1')
    fetchCusPermission('2')
    fetchCusPermission('3')
  }, [])

  React.useEffect(() => {
    if (isCreate) {
      let localFormikInit = { ...formikInit }
      const setLocalFormikInit = (
        data: Resultdatum[],
        param: 'roles1' | 'roles2' | 'roles3',
        paramAll: 'roles1_all' | 'roles2_all' | 'roles3_all',
      ) => {
        if (data) {
          const { localRoles_all, localRolse } = transformDataToCheckBox(data)
          localFormikInit[param] = localRolse
          localFormikInit[paramAll] = localRoles_all
        }
      }
      setLocalFormikInit(roles_type1, 'roles1', 'roles1_all')
      setLocalFormikInit(roles_type2, 'roles2', 'roles2_all')
      setLocalFormikInit(roles_type3, 'roles3', 'roles3_all')
      setFormikInit(localFormikInit)
    } else {
      if (accountData) {
        let { localRolse, localRoles_all } = transformDataToCheckBox(accountData)
        setFormikInit({
          name: accountData.user_name,
          email: accountData.email,
          job_title: accountData?.job_title ? accountData.job_title : '',
          role_type: accountData.role_type as '1' | '2' | '3',
          noNeedVerify: accountData.order_chk === '0' ? '1' : '0',
          hasEditAuth: accountData.level_view === '1' ? '1' : '0',
          roles1: localRolse,
          roles1_all: localRoles_all,
          roles2: localRolse,
          roles2_all: localRoles_all,
          roles3: localRolse,
          roles3_all: localRoles_all,
          open_flag: accountData.open_flag as '0' | '1' | '2',
        })
      }
    }
  }, [accountData, roles_type1, roles_type2, roles_type3, isCreate])

  function closeDrawer() {
    setIsOpen(false)
    if (isCompany) return history.push(`/pages/customermanagement/company/${companyId}`)
    return history.push(`/pages/customermanagement/company/${companyId}/dealer/${dealerid}`)
  }

  useEffect(() => {
    return () => {
      setIsOpen(false)
    }
  }, [])

  const [isEmailErr, setIsEmailErr] = React.useState(false)

  function doSubmit(values: FormSchema, formikHelpers: FormikHelpers<FormSchema>) {
    const rolesValue = values.role_type === '1' ? values.roles1 : values.role_type === '2' ? values.roles2 : values.roles3
    if (isCreate) {
      mutate(
        {
          company_model: isCompany ? '1' : '2',
          customer_id: isCompany ? parseInt(companyId) : Number(dealerid),
          email: values.email,
          job_title: values.job_title ? values.job_title : null,
          level_view: values.hasEditAuth === '0' ? '0' : '1',
          order_chk: values.noNeedVerify === '0' ? '1' : '0',
          role_type: values.role_type as '1' | '2' | '3',
          roles: rolesValue.map((item) => ({ button_id: item.id, isChose: 'Y' })),
          user_name: values.name,
        },
        {
          onSuccess: (data) => {
            const isMailSendError = data.data.return_code === 'MAIL_SEND_ERROR'
            formikHelpers.setSubmitting(false)
            closeDrawer()
            openToast &&
              openToast({
                message: [t('toast.companyAccountCreateSuccess'), isMailSendError ? t('company.sendEmailFailed') : t('company.sendEmailSuccess')],
                error: [false, isMailSendError],
              })
            queryClient.invalidateQueries(apiKey.getCustomer)
          },
          onError: (error) => {
            if (error.response.status === 400 && error.response.data.return_message.email) {
              setIsEmailErr(true)
              formikHelpers.validateForm()
              setIsToastError && setIsToastError(true)
              openToast && openToast(t('toast.formhasErrors'))
              formikHelpers.setSubmitting(false)
            } else if (error.response.status !== 401 && error.response.status !== 403) {
              openAlert({
                title: t('alert.internetErrorTitle'),
                content: t('alert.internetErrorDes'),
                isDicidedMode: false,
                confirmBtnLabel: t('alert.internetErrorBtn'),
              })
            }
          },
        },
      )
    } else {
      updateCustomer({
        user_id: Number(accountid),
        customer_id: isCompany ? parseInt(companyId) : Number(dealerid),
        job_title: values.job_title ? values.job_title : null,
        level_view: values.hasEditAuth === '0' ? '0' : '1',
        order_chk: values.noNeedVerify === '0' ? '1' : '0',
        role_type: values.role_type as '1' | '2' | '3',
        roles: rolesValue.map((item) => ({ button_id: item.id, isChose: 'Y' })),
        user_name: values.name,
        open_flag: accountData?.open_flag === '2' ? '2' : values.open_flag === '1' ? '1' : '0',
      })
      formikHelpers.setSubmitting(false)
    }
  }

  const [shouldSendMail, setShouldSendMail] = React.useState(false)
  useSendOpeningAccount(accountData?.email, isCreate ? false : shouldSendMail, setShouldSendMail, openToast, closeDrawer)

  const [isOpenFlagShowing, setIsOpenFlagShowing] = React.useState(true)

  const doEmailChange = (e: React.ChangeEvent<unknown>, formInnerChange: FormikHandlers['handleChange']) => {
    setIsEmailErr(false)
    formInnerChange(e)
  }

  const drawerTitle = isCompany
    ? isCreate
      ? t('company.addCompanyAccount')
      : t('company.editCompanyAccount')
    : isCreate
    ? t('company.addDealerAccount')
    : t('company.editDealerAccount')

  const onOpenFlagConfirm = (flag_Values?: flagValues, setFlag_Values?: setFlagValues) => {
    if (flag_Values && flag_Values?.open_flag === '0') {
      let localRoleInit: { roles2: RolesType[]; roles2_all: RolesAllType; roles3: RolesType[]; roles3_all: RolesAllType } = {
        roles2: [],
        roles2_all: {},
        roles3: [],
        roles3_all: {},
      }
      const setLocalFormikInit = (data: Resultdatum[], param: string, paramAll: string) => {
        if (data) {
          const { localRoles_all, localRolse } = transformDataToCheckBox(data)
          localRoleInit[param as 'roles2' | 'roles3'] = localRolse
          localRoleInit[paramAll as 'roles2_all' | 'roles3_all'] = localRoles_all
        }
      }
      setLocalFormikInit(roles_type2, 'roles2', 'roles2_all')
      setLocalFormikInit(roles_type3, 'roles3', 'roles3_all')

      setFlag_Values && setFlag_Values({ ...flag_Values, open_flag: '1', role_type: null, noNeedVerify: false, hasEditAuth: false, ...localRoleInit })
      setIsOpenFlagShowing(false)
    }
  }

  return (
    <InfoDrawer.Container title={drawerTitle} open={isOpen} onClose={closeDrawer} width='700px'>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        validate={(val) => accountValidate(val, { emailDupli: isEmailErr })}
        enableReinitialize={true}
        initialValues={formikInit}
        onSubmit={doSubmit}
      >
        {(props) => {
          return (
            <Form<FormSchema> {...props}>
              <Alert
                isDicidedMode={alertMessage.isDicidedMode as boolean}
                onConfirm={alertMessage.onConfirm}
                onClose={closeAlert}
                open={isAlertOpen}
                confirmBtnLabel={alertMessage.confirmBtnLabel}
                title={alertMessage.title}
                content={alertMessage.content}
              />
              <InfoDrawer.Content>
                <FormikField
                  disabled={isCreate ? !hasAddPermission : !hasEditPermission}
                  placeholder={t('company.namePlaceholder')}
                  style={{ marginTop: '0' }}
                  label={t('company.userName')}
                  name='name'
                />
                <FormikField
                  disabled={isCreate ? !hasAddPermission : true}
                  placeholder={t('company.userEmailPlaceholder')}
                  label={t('company.userEmail')}
                  name='email'
                  onChange={(e: React.ChangeEvent<unknown>) => doEmailChange(e, props.handleChange)}
                />
                <FormikField
                  disabled={isCreate ? !hasAddPermission : !hasEditPermission}
                  placeholder={t('company.userPositionPlaceholder')}
                  label={t('company.userPosition')}
                  name='job_title'
                  suffix={<Info style={{ width: '132px' }}>{t('company.positionExample')}</Info>}
                />
                <RoleTypeWithPermission
                  label={
                    <RoleWithInheritBtn
                      disabled={isCreate ? !hasAddPermission : !hasEditPermission || props.values.role_type === '1'}
                      onClick={() => setOpenInheritAccount(true)}
                      suffix={<Info style={{ width: '320px' }}>{t('company.dealerPermissionDesc')}</Info>}
                    />
                  }
                  name='role_type'
                  disabled={isCreate ? !hasAddPermission : !hasEditPermission || props.values.role_type === '1'}
                  radios={roleRadios}
                  isCompany={isCompany}
                />
                {props.values.role_type === '1' && (
                  <RoleCheckBoxGroup
                    disabled={isCreate ? !hasAddPermission : !hasEditPermission || props.values.role_type === '1'}
                    menuBtns={roles_type1}
                    name='roles1'
                  />
                )}
                {props.values.role_type === '2' && (
                  <RoleCheckBoxGroup disabled={isCreate ? !hasAddPermission : !hasEditPermission} menuBtns={roles_type2} name='roles2' />
                )}
                {props.values.role_type === '3' && (
                  <RoleCheckBoxGroup disabled={isCreate ? !hasAddPermission : !hasEditPermission} menuBtns={roles_type3} name='roles3' />
                )}
                {props.values.role_type && (
                  <div className={classes.roleSwitchContainer}>
                    <FormikSwitch
                      disabled={isCreate ? !hasAddPermission : !hasEditPermission || props.values.role_type === '1'}
                      label={t('company.orderView')}
                      name='noNeedVerify'
                    />
                    <div className={classes.divider} />
                    <FormikSwitch
                      disabled={isCreate ? !hasAddPermission : !hasEditPermission || props.values.role_type === '1'}
                      label={t('company.roleEditPermission')}
                      name='hasEditAuth'
                    />
                  </div>
                )}
                {!isCreate && isOpenFlagShowing && props.values.open_flag !== '2' && (
                  <OpenFlagProvider
                    value={{
                      openAlert,
                      closeAlert,
                      alertTitle: props.values.open_flag === '1' ? t('alert.accountTurnOff') : t('alert.accountTurnOn'),
                      alertContent: props.values.open_flag === '1' ? t('alert.accountTurnOffDescript') : t('alert.accountTurnOnDescript'),
                      isAlwaysConfirm: accountData?.role_type === '1' ? true : false,
                      buttonLabel: props.values.open_flag === '1' ? t('alert.turnOffOpenBtn') : t('alert.turnOnOpenBtn'),
                      onConfirm: onOpenFlagConfirm,
                    }}
                  >
                    <OpenFlag disabled={props.values.open_flag === '1' && props.values.role_type === '1'} />
                  </OpenFlagProvider>
                )}
                {!isCreate && hasEmailPermission && props.values.open_flag === '2' && (
                  <div className={classes.sendEmail}>
                    <FormHelperText className={`${classes.blueInputLabel}`}>
                      <span>{t('company.openFlag')}</span>
                    </FormHelperText>
                    <EmailSender isChinese={language === 'zh-TW' ? true : false} onEmailSend={() => setShouldSendMail(true)} />
                  </div>
                )}
              </InfoDrawer.Content>
              {(isCreate ? hasAddPermission : hasEditPermission) && (
                <InfoDrawer.Footer>
                  <Box display='flex' justifyContent='flex-end'>
                    {
                      <div>
                        <Button onClick={() => doFormCancel(props.dirty)} width={100} height={40} isWhiteButton fullWidth={false} type='button'>
                          {t('button.cancel')}
                        </Button>
                        <Button
                          className={classes.saveButton}
                          width={100}
                          height={40}
                          fullWidth={false}
                          type={props.isSubmitting ? 'button' : 'submit'}
                        >
                          {isCreate ? t('button.addbutton') : t('button.save')}
                        </Button>
                      </div>
                    }
                  </Box>
                </InfoDrawer.Footer>
              )}
              <AccountInherit
                formValues={props.values}
                setFormValues={props.setValues}
                companyId={isCompany ? companyId : String(dealerid)}
                open={openInheritAccount}
                onClose={() => setOpenInheritAccount(false)}
              />
            </Form>
          )
        }}
      </Formik>
    </InfoDrawer.Container>
  )
}

export default AccountEditor
