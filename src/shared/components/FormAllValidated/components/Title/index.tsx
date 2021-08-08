import React from 'react'
import { Controller } from 'react-hook-form'
import { Props } from './model'
import InputField from 'src/shared/components/BlueFormContainer/InputField'
import useStyles from './useStyles'

const Title: React.FC<Props> = ({ disabled, fieldName, name, value, defaultValue, control, isHidden, error, errorMessage }) => {
  const [inputValue, setInputValue] = React.useState<string | number>('')
  const classes = useStyles()
  React.useEffect(() => {
    value && setInputValue(value)
  }, [value])

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={(props) => (
        <InputField
          disabled={disabled}
          className={classes.titleControl}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value)
            props.onChange(event.target.value)
          }}
          style={{ display: isHidden ? 'none' : 'block' }}
          label={fieldName}
          placeholder='輸入標題'
          error={Boolean(error)}
          errorMessage={errorMessage}
        />
      )}
    />
  )
}

export default Title
