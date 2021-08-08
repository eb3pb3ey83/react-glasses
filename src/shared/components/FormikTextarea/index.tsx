import { FormControl, FormHelperText } from '@material-ui/core'
import { useField } from 'formik'
import React, { forwardRef } from 'react'
import FlexibleTextarea from '../FlexibleTextarea'
import { Props } from './model'
import useStyles from './useStyles'

const FormikTextarea: React.FC<Props> = forwardRef(({ label, labelClassName = '', onChange, placeholder, suffix, ...restProps }, ref) => {
  const [field, meta] = useField(restProps)
  const classes = useStyles()

  return (
    <FormControl classes={{ root: classes.blueFormControl }} style={restProps.style}>
      <FormHelperText className={`${labelClassName} ${classes.blueInputLabel} ${classes.lebel}`}>
        <span {...(suffix && { className: classes.labelWithSuffix })}>{label}</span>
        {suffix && suffix}
      </FormHelperText>
      <FlexibleTextarea
        isError={!!meta.error && !!meta.touched}
        placeholder={placeholder}
        disabled={!!restProps.disabled}
        ref={ref}
        {...field}
        onChange={onChange || field.onChange}
      />
      {meta.touched && meta.error && (
        <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  )
})

FormikTextarea.displayName = 'FormikTextarea'
export default FormikTextarea
