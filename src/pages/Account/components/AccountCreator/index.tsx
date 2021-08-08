import { Box } from '@material-ui/core'
import React from 'react'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { Props } from './model'
import useFormConfig from './formConfig'
import { FormToolsContext } from './context'
import useCreatingRole from '../../services/createAccount/hooks'
import AccountModifier from './components/AccountModifier'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'
import { AlertUnauthContext } from 'src/pages/model'

const AccountCreator: React.FC<Props> = ({ openToast, closeDrawer, deptList, roleList }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { mutate } = useCreatingRole(openToast, closeDrawer, openUnAuthAlert)
  const classes = useStyles()
  const { handleSubmit, onSubmit, ...restTools } = useFormConfig(mutate)
  const { t } = useTranslation()

  return (
    <FormToolsContext.Provider value={restTools}>
      <InfoDrawer.Container title={t('account.addAccount')} open onClose={closeDrawer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InfoDrawer.Content>
            <AccountModifier deptList={deptList} roleList={roleList} />
          </InfoDrawer.Content>
          <InfoDrawer.Footer>
            <Box display='flex' justifyContent='flex-end'>
              <Box>
                <Button onClick={closeDrawer} width={113} height={40} isWhiteButton fullWidth={false} type='button'>
                  {t('button.cancel')}
                </Button>
                <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit'>
                  {t('button.addbutton')}
                </Button>
              </Box>
            </Box>
          </InfoDrawer.Footer>
        </form>
      </InfoDrawer.Container>
    </FormToolsContext.Provider>
  )
}

export default AccountCreator
