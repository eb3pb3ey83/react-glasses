import Box from '@material-ui/core/Box'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import useOpeningAccount from 'src/pages/Account/services/accountOpen/hooks'
import useUpdatingAccount from 'src/pages/Account/services/updateAccount/hooks'
import { AlertUnauthContext } from 'src/pages/model'
import Alert from 'src/shared/components/Alert'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { getPermission } from 'src/utils/getPermission'
import { FormToolsContext } from '../../context'
import useFormConfig from '../../formConfig'
import AccountModifier from '../AccountModifier'
import { Props } from './model'
import useStyles from './useStyles'

const AccountForm: React.FC<Props> = ({ accountInfo, openToast, closeDrawer, deptList, roleList }) => {
  const params: { id: string } = useParams()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

  const { mutate } = useUpdatingAccount(openToast, closeDrawer, openUnAuthAlert)
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { hasQueryPermission, hasUpdatePermission } = getPermission('user')
  const { mutate: sendEmail } = useOpeningAccount(openAlert, openUnAuthAlert)
  const { t } = useTranslation()
  const classes = useStyles()

  const { handleSubmit, onSubmit, isFormDirty, ...restTools } = useFormConfig(mutate, Number(params.id), accountInfo)

  const confirmExit = () => {
    openAlert({
      title: t('alert.section21'),
      content: t('alert.section22'),
      isDicidedMode: true,
      onConfirm: closeDrawer,
    })
  }

  const onCancel = () => {
    if (isFormDirty) {
      confirmExit()
    } else {
      closeDrawer()
    }
  }

  return (
    <FormToolsContext.Provider
      value={{
        ...restTools,
        openFlag: accountInfo?.open_flag,
        email: accountInfo?.email,
        hasQueryPermission,
        hasUpdatePermission,
        sendEmail,
      }}
    >
      <InfoDrawer.Container title={t('title.section1')} open onClose={onCancel}>
        <Alert
          isDicidedMode={alertMessage.isDicidedMode as boolean}
          onConfirm={alertMessage.onConfirm}
          onClose={closeAlert}
          open={isAlertOpen}
          title={alertMessage.title}
          content={alertMessage.content}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <InfoDrawer.Content disabled={!hasUpdatePermission}>
            <AccountModifier hasUpdatePermission={hasUpdatePermission} deptList={deptList} roleList={roleList} />
          </InfoDrawer.Content>
          {hasUpdatePermission && (
            <InfoDrawer.Footer>
              <Box display='flex' justifyContent='flex-end'>
                <Box>
                  <Button onClick={onCancel} width={113} height={40} isWhiteButton fullWidth={false} type='button'>
                    {t('button.cancel')}
                  </Button>
                  <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit'>
                    {t('button.save')}
                  </Button>
                </Box>
              </Box>
            </InfoDrawer.Footer>
          )}
        </form>
      </InfoDrawer.Container>
    </FormToolsContext.Provider>
  )
}

export default AccountForm
