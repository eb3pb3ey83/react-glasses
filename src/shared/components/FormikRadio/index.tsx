import { FormControl, FormHelperText } from '@material-ui/core'
import React from 'react'
import { Props } from './model'
import { useField, useFormikContext } from 'formik'
import RadioGroupWithLabel from '../RadioGroupWithLabel'
import useStyles from './useStyles'

const FormikRadio: React.FC<Props> = ({ label, radios, ...restProps }) => {
  const classes = useStyles()
  const [field, meta] = useField(restProps)
  const formikContext = useFormikContext()

  React.useEffect(() => {
    formikContext.setTouched({ ...formikContext.touched, roles: false })
  }, [field.value])

  return (
    <FormControl classes={{ root: classes.blueFormControl }} style={restProps.style}>
      <RadioGroupWithLabel
        classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
        radios={radios}
        label={label || ''}
        // disabled={isCountyDisabled}
        {...field}
      />
      {meta.touched && meta.error && (
        <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default FormikRadio
