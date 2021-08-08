import React from 'react'
import { Box } from '@material-ui/core'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import RoleModifier from './components/RoleModifier'
import { Props } from './model'
import useMenuButton from '../../services/menuButton/hooks'
import useFormConfig from './formConfig'
import { FormToolsContext } from './context'
import useCreatingRole from '../../services/createRole/hooks'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const RoleCreator: React.FC<Props> = ({ openToast, closeDrawer }) => {
  const { data, isMenuInfoFetched } = useMenuButton()
  const { mutate } = useCreatingRole(openToast, closeDrawer)
  const classes = useStyles()
  const { t } = useTranslation()
  const { handleSubmit, onSubmit, ...restTools } = useFormConfig(mutate)

  return (
    <FormToolsContext.Provider value={restTools}>
      <InfoDrawer.Container width={700} title={t('role.createRole')} open onClose={closeDrawer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InfoDrawer.Content>{isMenuInfoFetched && data && <RoleModifier menuButtons={data.data.result_data} />}</InfoDrawer.Content>
          <InfoDrawer.Footer>
            <Box display='flex' justifyContent='flex-end'>
              <Box>
                <Button onClick={closeDrawer} width={113} height={40} isWhiteButton fullWidth={false} type='button'>
                  {t('button.cancel')}
                </Button>
                <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit'>
                  {t('button.save')}
                </Button>
              </Box>
            </Box>
          </InfoDrawer.Footer>
        </form>
      </InfoDrawer.Container>
    </FormToolsContext.Provider>
  )
}

export default RoleCreator
