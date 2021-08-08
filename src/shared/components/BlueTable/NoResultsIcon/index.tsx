import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as NoResultIcon } from 'src/assets/icon/noResult-icon.svg'
import useStyles from './useStyles'

const NoResultsIcon: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.noResultsIcon}>
      <NoResultIcon />
      <div style={{ marginTop: '8px' }}>{t('noData')}</div>
    </div>
  )
}

export default NoResultsIcon
