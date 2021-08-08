import { FormControl, FormHelperText } from '@material-ui/core'
import React, { forwardRef } from 'react'
import Input from '../Input'
import { Props } from './model'
import useStyles from './useStyles'

const Field: React.FC<Props> = forwardRef(({ formControlClasses, label, errorMessage, labelClassName = '', ...restProps }, ref) => {
  const classes = useStyles()

  return (
    <FormControl classes={formControlClasses} style={restProps.style}>
      <FormHelperText className={`${labelClassName} ${classes.lebel}`}>{label}</FormHelperText>
      <Input disabled={!!restProps.disabled} ref={ref} {...restProps} />
      {restProps.error && (
        <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  )
})

Field.displayName = 'Field'
export default Field
