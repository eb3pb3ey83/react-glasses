import { Snackbar as SnackbarComponent } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { ReactComponent as SuccessIcon } from 'src/assets/icon/success.svg'
import { ReactComponent as ErrorIcon } from 'src/assets/icon/warning-icon.svg'
import { Props } from './model'
import useStyles from './useStyles'

const SnackBar: React.FC<Props> = ({ severity, open, onClose, message, anchorOrigin, autoHideDuration, ...restProps }) => {
  const classes = useStyles()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose(event, reason)
  }

  return (
    <SnackbarComponent
      {...restProps}
      className={classes.container}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert iconMapping={{ success: <SuccessIcon />, error: <ErrorIcon /> }} onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </SnackbarComponent>
  )
}

SnackBar.defaultProps = {
  autoHideDuration: 3000,
}

export default SnackBar
