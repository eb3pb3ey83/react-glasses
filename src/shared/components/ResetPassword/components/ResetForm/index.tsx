import React from 'react'
import classNames from 'classnames'
import PasswordField from 'src/shared/components/PasswordField'
import useFormConfig from './formConfig'
import Button from '../../../Button'
import { FormHelperText, Typography } from '@material-ui/core'
import { sendEventType } from '../..'
import useResetPasswordToken from 'src/reset/service/getResetPasswordToken/hooks'
import Loading from 'src/shared/components/Loading'
import useResetPassword from 'src/reset/service/patchResetPassword/hooks'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'
import { AlertUnauthContext } from 'src/pages/model'

interface Props {
  send: sendEventType
  isModifiedMode?: boolean
}

const ResetForm: React.FC<Props> = ({ send, isModifiedMode }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

  const classes = useStyles({ isModifiedMode })
  const { mutate } = useResetPassword(send, openUnAuthAlert)
  const { isFetched, token } = useResetPasswordToken(openUnAuthAlert, send, isModifiedMode)
  const { register, handleSubmit, onSubmit, errors } = useFormConfig(mutate, token)
  const { t } = useTranslation()

  const helperText = classNames({
    [classes.modifiedHeplerText]: isModifiedMode,
    [classes.heplerText]: !isModifiedMode,
    [classes.heplerTextError]: errors.password?.message,
  })

  return isFetched || isModifiedMode ? (
    <>
      <Typography variant='h5' className={classes.mainTitle}>
        {isModifiedMode ? t('reset11') : t('reset1')}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          labelClassName={classes.label}
          placeholder={t('loginPage.passwordPlaceholder')}
          ref={register}
          label={t('reset12')}
          name='password'
          error={Boolean(errors.password)}
        />
        <FormHelperText className={helperText}>{t('login1')}</FormHelperText>
        <PasswordField
          ref={register}
          placeholder={t('loginPage.passwordPlaceholder')}
          label={t('reset13')}
          name='confirmPassword'
          labelClassName={classes.label}
          error={Boolean(errors.confirmPassword)}
          errorMessage={errors?.confirmPassword?.message}
        />
        <Button height={isModifiedMode ? 40 : 54} type='submit'>
          {t('reset16')}
        </Button>
      </form>
    </>
  ) : (
    <Loading />
  )
}

export default ResetForm
