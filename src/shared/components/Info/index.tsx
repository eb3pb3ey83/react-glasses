import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import { Props } from './model'
import useStyles from './useStyles'

const Info: React.FC<Props> = ({ children, style, className = '' }) => {
  const classes = useStyles()

  return (
    <span className={classes.container}>
      <InfoIcon />
      <span style={style} className={`${classes.info} ${className}`}>
        {children}
      </span>
    </span>
  )
}

export const PermissionInfo: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Info className={classes.permissionInfo}>
      <span className={classes.container}>
        <b>{t('select.customerAuthorityManager')}</b>
        {t('company.permissionInfo1')}
        <b>{t('select.customerAuthorityUser')}</b>
        {t('company.permissionInfo2')}
        <b>{t('select.customerAuthorityUser')}</b>
        {t('company.permissionInfo3')}
        <b>{t('select.customerAuthorityManager')}</b>
        {t('company.permissionInfo2')}
        {t('company.permissionInfo4')}
      </span>
    </Info>
  )
}

export default Info
