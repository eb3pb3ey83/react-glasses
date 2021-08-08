import React, { forwardRef } from 'react'
import Field from 'src/shared/components/Field'
import { Props } from './model'
import useStyles from './useStyles'

const InputField: React.FC<Props> = forwardRef(({ label = '', placeholder = '', height = '40px', ...restProps }, ref) => {
  const classes = useStyles()

  return (
    <Field
      ref={ref}
      label={label}
      formControlClasses={{
        root: `${classes.blueFormControl}`,
      }}
      classes={{ root: classes.blueInput, notchedOutline: classes.notched }}
      labelClassName={classes.blueInputLabel}
      placeholder={placeholder}
      height={height}
      {...restProps}
    />
  )
})

InputField.displayName = 'InputField'
export default InputField
