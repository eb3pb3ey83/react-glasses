import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as InAccountIcon } from 'src/assets/icon/inheritAccount-icon.svg'
import { Props } from './model'
import useStyles from './useStyles'

const RoleWithInheritBtn: React.FC<Props> = ({ disabled = false, onClick, ...restProps }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <span className={classes.roleWithInheritBtn}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span {...(restProps.suffix && { className: classes.labelWithSuffix })}>{t('company.customerRole')}</span>
        {restProps.suffix && restProps.suffix}
      </span>
      {!disabled && (
        <span className={classes.btn} onClick={onClick}>
          <InAccountIcon />
          {t('company.inheritAccount')}
        </span>
      )}
    </span>
  )
}

export default RoleWithInheritBtn
