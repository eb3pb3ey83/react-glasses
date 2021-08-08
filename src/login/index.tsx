import { Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'react-i18next'
import LanguageButton from 'src/shared/components/LanguageButton'
import ResetPassword from 'src/shared/components/ResetPassword'
import Form from './components/Form'
import useStyles from './useStyles'

const Login: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  return (
    <div className={classes.container}>
      <ResetPassword open={open} onClose={() => setOpen(false)} disableBackdropClick />
      <div className={classes.background}></div>
      <div className={classes.formContainer}>
        <LanguageButton className={`${classes.languageButton} langBtn`} />
        <div className={classes.form}>
          <Typography variant='h5' className={classes.mainTitle}>
            {t('loginPage.title')}
          </Typography>
          <Typography className={classes.subTitle}>{t('loginPage.subTitle')}</Typography>
          <Form>
            <button onClick={() => setOpen(true)} type='button' className={classes.forgetPassword}>
              {t('loginPage.forgetPassword')}
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
