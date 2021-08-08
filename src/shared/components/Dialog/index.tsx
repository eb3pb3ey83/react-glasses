import { Dialog as DialogComponent } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import useStyles from './useStyles'

interface Props {
  open: boolean
  onClose?: () => void
  withCloseIcon?: boolean
  [key: string]: unknown
}

const Dialog: React.FC<Props> = ({ open, children, onClose, withCloseIcon, ...props }) => {
  const classes = useStyles()

  return (
    <DialogComponent {...props} open={open}>
      {withCloseIcon && (
        <button className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </button>
      )}

      {children}
    </DialogComponent>
  )
}

Dialog.defaultProps = {
  withCloseIcon: true,
}

export default Dialog
