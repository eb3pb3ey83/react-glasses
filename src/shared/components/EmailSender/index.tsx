import FormHelperText from '@material-ui/core/FormHelperText'
import { ReactComponent as MailIcon } from 'src/assets/icon/mail.svg'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import React from 'react'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import { Props } from './model'
import useStyles from './useStyles'

const EmailSender: React.FC<Props> = ({ onEmailSend, disabled, isChinese }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Button
        fullWidth={false}
        disabled={disabled}
        onClick={onEmailSend}
        startIcon={<MailIcon />}
        width={isChinese ? 170 : 320}
        height={40}
        type='button'
        isWhiteButton
      >
        {t('account.section3')}
      </Button>
      <FormHelperText className={classes.accountInfo}>
        <InfoIcon />
        <span className={classes.accountInfoText}>{t('account.section4')}</span>
      </FormHelperText>
    </>
  )
}

export default EmailSender
