import React from 'react'
import Button from 'src/shared/components/Button'
import failedIcon from 'src/assets/img/wrong.png'
import { FormHelperText, Typography } from '@material-ui/core'
import { sendEventType } from '../..'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

interface Props {
  send: sendEventType
}

const onConfirm = (send: sendEventType) => {
  send({ type: 'SEND_EMAIL' })
}

const ResetFailed: React.FC<Props> = ({ send }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <img className={classes.failedIcon} src={failedIcon} alt='' />
      <Typography variant='h5' className={classes.mainTitle}>
        {t('reset8')}
      </Typography>
      <FormHelperText className={classes.heplerText}>{t('reset9')}</FormHelperText>
      <Button onClick={() => onConfirm(send)} type='submit'>
        {t('reset10')}
      </Button>
    </>
  )
}

export default ResetFailed
