import React from 'react'
import Button from 'src/shared/components/Button'
import successIcon from 'src/assets/img/check.png'
import { FormHelperText, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const ResetSuccess: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const goHome = () => {
    window.localStorage.clear()
    location.href = '/'
  }

  React.useEffect(() => {
    setTimeout(() => {
      goHome()
    }, 10000)
  }, [])

  return (
    <>
      <img className={classes.successIcon} src={successIcon} alt='' />
      <Typography variant='h5' className={classes.mainTitle}>
        {t('reset14')}
      </Typography>
      <FormHelperText className={classes.heplerText}>{t('reset15')}</FormHelperText>
      <Button onClick={goHome} type='submit'>
        {t('reset16')}
      </Button>
    </>
  )
}

export default ResetSuccess
