import React from 'react'
import { FormControlLabel, FormGroup, FormHelperText, Radio, RadioGroup } from '@material-ui/core'
import { Props } from './model'
import useStyles from './useStyles'

const RadioGroupWithLabel: React.FC<Props> = ({ label, value, onChange, classNames, radios, className, ...restParam }) => {
  const classes = useStyles()
  return (
    <FormGroup className={`${classes.radioFormGroup} ${className ? className : ''}`}>
      <FormHelperText className={classNames?.label ? classNames.label : ''}>{label}</FormHelperText>
      <RadioGroup
        value={value}
        onChange={onChange}
        // aria-label='area'
        className={
          classNames?.radioGroup
            ? `${classNames.radioGroup} ${!!restParam.disabled ? 'disabledRadio' : ''}`
            : `${!!restParam.disabled ? 'disabledRadio' : ''}`
        }
      >
        {radios.map((radio) => (
          <FormControlLabel
            key={radio.value}
            className={classNames?.radio ? classNames.radio : ''}
            value={radio.value}
            control={<Radio name={(restParam.name as string) || 'localRadio'} />}
            disabled={!!restParam.disabled || !!restParam.readOnly}
            label={radio.label}
          />
        ))}
      </RadioGroup>
    </FormGroup>
  )
}

export default RadioGroupWithLabel
