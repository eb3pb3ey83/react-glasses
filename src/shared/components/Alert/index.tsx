import React from 'react'
import { Box, FormHelperText, Typography } from '@material-ui/core'
import { Props } from './model'
import Button from '../Button'
import Dialog from '../Dialog'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const Alert: React.FC<Props> = ({ open, onClose, onConfirm, isDicidedMode, title, content, cancelBtnLabel, confirmBtnLabel }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Dialog onClose={onClose} open={open} className={classes.container}>
      <Typography variant='h5' className={classes.mainTitle}>
        {title}
      </Typography>
      <FormHelperText className={classes.heplerText}>{content}</FormHelperText>
      {isDicidedMode ? (
        <Box display='grid' gridTemplateColumns='1fr 1fr' gridColumnGap='16px'>
          <Button height={40} onClick={onClose} isWhiteButton type='button'>
            {cancelBtnLabel ? cancelBtnLabel : t('button.cancel')}
          </Button>
          <Button height={40} onClick={onConfirm} type='button'>
            {confirmBtnLabel ? confirmBtnLabel : t('reset16')}
          </Button>
        </Box>
      ) : (
        <Button onClick={onClose} type='button'>
          {t('reset16')}
        </Button>
      )}
    </Dialog>
  )
}

export default Alert
