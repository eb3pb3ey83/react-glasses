import React from 'react'
import ErrorIcon from '@material-ui/icons/Error'
import { Props } from './model'
import useStyles from './useStyles'

const ErrorMessage: React.FC<Props> = ({ className, message }) => {
  const classes = useStyles()

  return (
    <span className={className}>
      <ErrorIcon className={classes.errorIcon} />
      {message}
    </span>
  )
}

export default ErrorMessage
