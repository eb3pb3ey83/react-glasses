import React from 'react'
import { Box } from '@material-ui/core'
import deleteIconSrc from 'src/assets/icon/delete.svg'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import RoleModifier from './components/RoleModifier'
import { Props } from './model'
import useMenuButton from '../../services/menuButton/hooks'
import useFormConfig from './formConfig'
import { FormToolsContext } from './context'
import { useParams } from 'react-router-dom'
import useRoleInfo from '../../services/roleInfo/hooks'
import useUpdatingRole from '../../services/updateRole/hooks'
import Alert from 'src/shared/components/Alert'
import useDeletingRole from '../../services/deleteRole/hooks'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { getPermission } from 'src/utils/getPermission'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const RoleEditor: React.FC<Props> = ({ openToast, closeDrawer }) => {
  const params: { id: string } = useParams()
  const { data, isMenuInfoFetched } = useMenuButton()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { hasAllPermission, hasDeletePermission, hasUpdatePermission } = getPermission('role')
  const { roleInfo, isRoleInfoFetched } = useRoleInfo(params.id)
  const { mutate } = useUpdatingRole(openToast, closeDrawer)
  const classes = useStyles()
  const { handleSubmit, onSubmit, ...restTools } = useFormConfig(mutate, Number(params.id), roleInfo, isRoleInfoFetched)
  const { mutate: deleteRole } = useDeletingRole(openToast, closeDrawer, closeAlert, openAlert, roleInfo)
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'
  const { t } = useTranslation()

  const confirmDelete = () => {
    openAlert({
      title: `${t('alert.section19')}${isChinese ? roleInfo?.role_name_ch : roleInfo?.role_name_en}？`,
      content: t('alert.section20'),
      isDicidedMode: true,
      onConfirm: () => deleteRole({ id: params.id }),
    })
  }

  return (
    <FormToolsContext.Provider value={{ ...restTools, hasUpdatePermission: hasUpdatePermission || hasAllPermission }}>
      <InfoDrawer.Container width={700} title={t('role.editRole')} open onClose={closeDrawer}>
        <Alert
          onClose={closeAlert}
          open={isAlertOpen}
          onConfirm={alertMessage.onConfirm}
          isDicidedMode={alertMessage.isDicidedMode as boolean}
          title={alertMessage.title}
          content={alertMessage.content}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <InfoDrawer.Content disabled={!hasUpdatePermission}>
            {isMenuInfoFetched && isRoleInfoFetched && data && <RoleModifier menuButtons={data.data.result_data} />}
          </InfoDrawer.Content>

          {hasAllPermission && (
            <InfoDrawer.Footer>
              <Box display='flex' justifyContent='space-between'>
                {hasDeletePermission && (
                  <Button
                    height={40}
                    className={classes.deleteButton}
                    isDeleteButton
                    startIcon={<img src={deleteIconSrc} alt='' />}
                    fullWidth={false}
                    onClick={confirmDelete}
                    type='button'
                  >
                    {t('role.deleteRole')}
                  </Button>
                )}

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
          )}
        </form>
      </InfoDrawer.Container>
    </FormToolsContext.Provider>
  )
}

export default RoleEditor
