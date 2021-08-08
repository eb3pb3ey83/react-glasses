import { Box, FormHelperText, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import authConfig from 'src/utils/authConfig'
import CustomerSelector from '../CustomerSelector'
import { Props } from './model'
import useStyles from './useStyles'

const hasEditPermission = authConfig.getPermissions('company:upd')

const EditModeForm: React.FC<Props> = ({ onAdminNameFetched }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <Typography variant='h6' className={classes.title}>
        {t('company.adminSetting')}
      </Typography>
      <Box marginTop='25px'>
        <FormHelperText className={classes.label}>{t('company.assignUser')}</FormHelperText>
        <CustomerSelector disabled={!hasEditPermission} onAdminNameFetched={onAdminNameFetched} />
      </Box>
    </>
  )
}

export default EditModeForm
