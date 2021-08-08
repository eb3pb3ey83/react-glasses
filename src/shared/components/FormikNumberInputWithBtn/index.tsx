import { FormControl, FormHelperText } from '@material-ui/core'
import React, { forwardRef } from 'react'
import Input from '../Input'
import { Props } from './model'
import { useField, useFormikContext } from 'formik'
import { ReactComponent as MinusIcon } from 'src/assets/icon/minus-icon.svg'
import { ReactComponent as PlusIcon } from 'src/assets/icon/add-icon.svg'
import useStyles from './useStyles'

const FormikNumberInputWithBtn: React.FC<Props> = forwardRef(({ label, labelClassName = '', placeholder, ...restProps }, ref) => {
  const [field, meta] = useField(restProps)
  const [localValue, setLocalValue] = React.useState(1)
  const { setFieldValue } = useFormikContext()
  const classes = useStyles({ isDisabled: !!restProps.disabled, isError: !!meta.error && !!meta.touched })

  const btnClick = (value: number) => {
    const newValue = localValue + value
    if (newValue < 1) return
    setLocalValue(newValue)
    setFieldValue('package_amt', newValue)
  }

  const localOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? e.target.value : '1'
    setLocalValue(parseInt(newValue))
    setFieldValue('package_amt', parseInt(newValue))
  }

  return (
    <FormControl classes={{ root: classes.blueFormControl }} style={restProps.style}>
      {label && <FormHelperText className={`${labelClassName} ${classes.blueInputLabel} ${classes.lebel}`}>{label}</FormHelperText>}
      <div className={classes.inputWithBtn}>
        <div className={`${classes.minusBtn} minusBtn ${localValue === 1 ? 'disabled' : ''}`} onClick={() => btnClick(-1)}>
          <MinusIcon />
        </div>
        <Input
          placeholder={placeholder}
          height='40px'
          classes={{ root: `${classes.blueInput} blueInput`, notchedOutline: classes.notched }}
          disabled={!!restProps.disabled}
          ref={ref}
          {...field}
          value={localValue}
          onChange={localOnChange}
        />
        <div className={`${classes.plusBtn} plusBtn`} onClick={() => btnClick(1)}>
          <PlusIcon />
        </div>
      </div>
      {meta.touched && meta.error && (
        <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  )
})

FormikNumberInputWithBtn.displayName = 'FormikNumberInputWithBtn'
export default FormikNumberInputWithBtn
