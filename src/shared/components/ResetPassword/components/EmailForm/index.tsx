import React from 'react'
import Field from 'src/shared/components/Field'
import useFormConfig from './formConfig'
import Button from '../../../Button'
import { FormHelperText, Typography } from '@material-ui/core'
import { sendEventType, stateType } from '../..'
import useSendingEmail from 'src/shared/services/postEmail/hooks'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

interface Props {
  send: sendEventType

  state: stateType
  isResetPage?: boolean
}

const EmailForm: React.FC<Props> = ({ send, state, isResetPage }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { mutate, isLoading } = useSendingEmail(send, isResetPage)
  const { register, handleSubmit, onSubmit, errors } = useFormConfig(mutate)
  const isTickStart = state.matches({ emailForm: 'tickStart' })
  const { duration, elapsed } = state.context

  return (
    <>
      <Typography variant='h5' className={classes.mainTitle}>
        {t('reset1')}
      </Typography>
      <FormHelperText className={classes.heplerText}>{t('reset2')}</FormHelperText>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Field
          placeholder='Username@brightenoptix.com'
          ref={register}
          label={t('reset3')}
          name='email'
          error={Boolean(errors.email)}
          labelClassName={classes.emailLabel}
          errorMessage={errors?.email?.message}
        />
        <Button disabled={isLoading || isTickStart} type='submit'>
          {isTickStart ? `${t('reset4')}(${Math.ceil(duration - elapsed)})` : t('reset4')}
        </Button>
      </form>
    </>
  )
}

export default EmailForm
