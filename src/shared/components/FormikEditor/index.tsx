import { FormHelperText } from '@material-ui/core'
import { useFormikContext } from 'formik'
import React from 'react'
import Editor from '../Editor'
import { Props } from './model'
import useStyles from './useStyles'

const FormikEditor: React.FC<Props> = ({ name, label, labelClassName, errorMessage, disabled }) => {
  const { setFieldValue, getFieldMeta, errors } = useFormikContext<Record<string, unknown>>()
  const value = getFieldMeta<string>(name).value
  const error = errors[name]
  const classes = useStyles()

  return (
    <>
      <FormHelperText className={`${labelClassName} ${classes.blueInputLabel} ${classes.lebel}`}>
        <span>{label}</span>
      </FormHelperText>
      <Editor
        isShowTab={false}
        onDataSet={(newValue) => setFieldValue(name, newValue.data)}
        style={{ opacity: disabled ? '0.5' : '1' }}
        error={error}
        errorMessage={errorMessage}
        data={value}
        readonly={disabled}
      />
    </>
  )
}

export default FormikEditor
