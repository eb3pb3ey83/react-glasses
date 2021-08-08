import React from 'react'
import { useField } from 'formik'
import { Props, radioProps } from './model'
import { FormControl, FormHelperText } from '@material-ui/core'
import RadioGroupWithLabel from 'src/shared/components/RadioGroupWithLabel'
import useStyles from './useStyles'

const RoleTypeWithPermission: React.FC<Props> = React.memo(({ label, radios, ...restProps }) => {
  const classes = useStyles()
  const [filterRadios, setFilterRadios] = React.useState<radioProps[]>([])
  const [field, meta] = useField(restProps)

  React.useEffect(() => {
    if (field.value === '1') {
      let updateRadios = radios.filter((ra) => ra.value === '1')
      setFilterRadios(updateRadios)
    } else {
      let updateRadios = radios.filter((ra) => ra.value !== '1')
      setFilterRadios(updateRadios)
    }
  }, [field.value])

  return (
    <div>
      <FormControl classes={{ root: classes.blueFormControl }} style={restProps.style}>
        <RadioGroupWithLabel
          classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
          radios={filterRadios}
          label={label || ''}
          disabled={restProps.disabled}
          {...field}
        />
        {meta.touched && meta.error && (
          <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
            {meta.error}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
})
RoleTypeWithPermission.displayName = 'RoleTypeWithPermission'
export default RoleTypeWithPermission
