import { Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import FormikField from 'src/shared/components/FormikField'
import Info from 'src/shared/components/Info'
import authConfig from 'src/utils/authConfig'
import useStyles from './useStyles'

const hasAddPermission = authConfig.getPermissions('company:add')

const CreateModeForm: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <Typography variant='h6' className={classes.title}>
        {t('company.adminSetting')}
      </Typography>
      <FormikField disabled={!hasAddPermission} placeholder={t('company.namePlaceholder')} label={t('company.userName')} name='user_name' />
      <FormikField disabled={!hasAddPermission} placeholder={t('company.emailPlaceholder')} label={t('company.userEmail')} name='email' />
      <FormikField
        disabled={!hasAddPermission}
        suffix={<Info style={{ width: '132px' }}>{t('company.positionExample')}</Info>}
        placeholder={t('company.positionPlaceholder')}
        label={t('company.userPosition')}
        name='job_title'
      />
    </>
  )
}

export default CreateModeForm
