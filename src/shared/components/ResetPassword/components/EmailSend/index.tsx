import React from 'react'
import Button from '../../../Button'
import { FormHelperText, Typography } from '@material-ui/core'
import { sendEventType } from '../..'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

interface Props {
  send: sendEventType
  onClose?: () => void
}

const onDialogClose = ({ onClose, send }: Props) => {
  onClose && onClose()
  send({ type: 'CLOSE' })
}

const EmailSend: React.FC<Props> = ({ onClose, send }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Typography variant='h5' className={classes.mainTitle}>
        {t('reset5')}
      </Typography>
      <FormHelperText className={classes.heplerText}>{t('reset6')}</FormHelperText>
      <Button type='submit' onClick={() => onDialogClose({ onClose, send })}>
        {t('reset7')}
      </Button>
    </>
  )
}

export default EmailSend
