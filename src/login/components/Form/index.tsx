import React from 'react'
import { useTranslation } from 'react-i18next'
import Field from 'src/shared/components/Field'
import PasswordField from 'src/shared/components/PasswordField'
import useFormConfig from './formConfig'
import Button from 'src/shared/components/Button'
import useLogin from 'src/login/services/login/hooks'
import ErrorMessage from 'src/shared/components/ErrorMessage'
import useStyles from './useStyles'

const Form: React.FC = ({ children: forgetPasswordButton }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { mutate, isLoading, isError: isSubmitError } = useLogin()
  const { register, handleSubmit, onSubmit, errors } = useFormConfig(mutate)

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {isSubmitError && <ErrorMessage className={classes.loginFailed} message='電子郵件或密碼輸入錯誤，請再嘗試一次' />}
      <Field
        placeholder='Username@brightenoptix.com'
        ref={register}
        label={t('loginPage.email')}
        name='email'
        error={Boolean(errors.email)}
        errorMessage={errors?.email?.message}
      />
      <PasswordField
        ref={register}
        label={t('loginPage.password')}
        name='password'
        error={Boolean(errors.password)}
        errorMessage={errors?.password?.message}
        placeholder={t('loginPage.passwordPlaceholder')}
      />
      {forgetPasswordButton}
      <div className={classes.recaptcha}>recaptcha</div>
      <Button size='large' fullWidth type='submit' disabled={isLoading}>
        {t('loginPage.login')}
      </Button>
    </form>
  )
}

export default Form
