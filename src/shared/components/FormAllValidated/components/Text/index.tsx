import React from 'react'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import Editor from 'src/shared/components/Editor'
import { Props } from './model'
import useStyles from './useStyles'

const Text: React.FC<Props> = ({
  disabled,
  fieldName,
  name,
  isHiddenLabel,
  index,
  value,
  defaultValue,
  isHidden,
  error,
  errorMessage,
  onRemove,
  control,
}) => {
  const classes = useStyles({ disabled })

  const onDataSet = (newValue: string, formProps: ControllerRenderProps<Record<string, unknown>>) => {
    formProps.onChange(newValue)
  }

  return (
    <div className={classes.container}>
      <label className={classes.label} style={{ display: isHiddenLabel ? 'none' : 'block' }}>
        {fieldName}
      </label>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={(props) => (
          <Editor
            onDataSet={(newValue) => onDataSet(newValue.data, props)}
            style={{ display: isHidden ? 'none' : 'block', opacity: disabled ? '0.5' : '1' }}
            isDeleteHover={isHiddenLabel}
            error={error}
            errorMessage={errorMessage}
            index={index}
            onRemove={onRemove}
            data={value}
            readonly={disabled}
          />
        )}
        control={control}
      />
    </div>
  )
}

export default Text
