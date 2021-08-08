import { FormControl, FormHelperText } from '@material-ui/core'
import React, { forwardRef } from 'react'
import Input from '../Input'
import { Props } from './model'
import { useField } from 'formik'
import useStyles from './useStyles'

const FormikField: React.FC<Props> = forwardRef(({ label, labelClassName = '', placeholder, suffix, ...restProps }, ref) => {
  const [field, meta] = useField(restProps)
  const classes = useStyles({ isDisabled: !!restProps.disabled, isError: !!meta.error && !!meta.touched })

  return (
    <FormControl classes={{ root: classes.blueFormControl }} style={restProps.style}>
      <FormHelperText className={`${labelClassName} ${classes.blueInputLabel} ${classes.lebel}`}>
        <span {...(suffix && { className: classes.labelWithSuffix })}>{label}</span>
        {suffix && suffix}
      </FormHelperText>
      <Input
        placeholder={placeholder}
        height='40px'
        classes={{ root: classes.blueInput, notchedOutline: classes.notched }}
        disabled={!!restProps.disabled}
        ref={ref}
        {...field}
        onChange={restProps.onChange || field.onChange}
      />
      {meta.touched && meta.error && (
        <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  )
})

FormikField.displayName = 'FormikField'
export default FormikField
