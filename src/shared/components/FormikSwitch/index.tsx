import { FormControlLabel, FormHelperText, Switch } from '@material-ui/core'
import React from 'react'
import { Props } from './model'
import { useField, useFormikContext } from 'formik'
import useStyles from './useStyles'

const FormikSwitch: React.FC<Props> = ({
  title,
  label,
  onChange,
  checked,
  formControlLabelClassName = '',
  labelClassName = '',
  className = '',
  ...restProps
}) => {
  const classes = useStyles({ isDisabled: !!restProps.disabled })
  const [field, meta] = useField(restProps)
  const { setFieldValue, values, setValues } = useFormikContext<{ [key: string]: unknown }>()

  const onSwitchChange = () =>
    // _event: React.ChangeEvent<HTMLInputElement>, _checked: boolean
    {
      if (onChange) return onChange(values, setValues)
      setFieldValue(restProps.name, field.value === '1' ? '0' : '1')
    }

  return (
    <>
      {title && (
        <FormHelperText className={`${classes.blueInputLabel}`}>
          <span>{title}</span>
        </FormHelperText>
      )}
      <FormControlLabel
        className={`${classes.formControlLabel} ${formControlLabelClassName} ${className}`}
        classes={{ label: labelClassName }}
        control={
          <Switch
            classes={{ switchBase: classes.switchBase, thumb: classes.switchThumb, track: classes.switchTrack }}
            disableRipple
            {...field}
            onChange={
              onSwitchChange
              //   (_event, isChecked) => {
              //   onChangeProps && onChangeProps(isChecked, setFieldValue)
              // }
            }
            disabled={!!restProps.disabled}
            checked={checked ? checked : field.value === '1'}
            color='primary'
          />
        }
        label={label}
        labelPlacement='start'
      />
      {meta.touched && meta.error && (
        <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
          {meta.error}
        </FormHelperText>
      )}
    </>
  )
}

export default FormikSwitch
