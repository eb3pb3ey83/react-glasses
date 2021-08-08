import { Box, FormHelperText } from '@material-ui/core'
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik'
import { uniqueId } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as DeleteIcon } from 'src/assets/icon/delete.svg'
import { ReactComponent as WarningIcon } from 'src/assets/icon/warning-icon.svg'
import FormikFileUploader from '../FormikFileUploader'
import { Props } from './model'
import useStyles from './useStyles'

let imgIds = [uniqueId()]

const FormikMultipleFileUploader: React.FC<Props> = ({ parentFieldName, label, index, fieldName, hasUpdatePermission }) => {
  const { values } = useFormikContext<Record<string, Record<string, unknown>[]>>()
  const { t } = useTranslation()
  const [isUploadError, setIsUploadError] = React.useState(false)
  const field = values[parentFieldName][index][fieldName] as number[]
  const childFieldName = `${parentFieldName}.${index}.${fieldName}`
  const classes = useStyles()

  const addFileUploader = React.useCallback((arrayHelpers: FieldArrayRenderProps) => {
    arrayHelpers.push(0)
    imgIds.push(uniqueId())
  }, [])

  const onImageDelete = React.useCallback((fieldIndex: number, arrayHelpers: FieldArrayRenderProps) => {
    const hasEmptyItem = field.find((value) => value === 0) === 0

    imgIds.splice(fieldIndex, 1)
    arrayHelpers.remove(fieldIndex)

    if (hasEmptyItem) return

    addFileUploader(arrayHelpers)
  }, [])

  const onUpdateSuccess = React.useCallback((isUpdate: boolean, arrayHelpers: FieldArrayRenderProps) => {
    imgIds.push(uniqueId())
    setIsUploadError(false)
    !isUpdate && field.length < 6 && addFileUploader(arrayHelpers)
  }, [])

  return (
    <FieldArray
      name={childFieldName}
      render={(arrayHelpers) => (
        <>
          <Box marginTop='24px' marginBottom='3px' display='flex' justifyContent='flex-start'>
            <FormHelperText className={classes.bannerText}>{label}</FormHelperText>
            {isUploadError && (
              <span className={classes.labelError} style={{ marginLeft: '8px' }}>
                <WarningIcon />
                {t('image')}
              </span>
            )}
          </Box>

          <Box display='grid' gridTemplateColumns='1fr 1fr' gridColumnGap='16px' gridRowGap='16px'>
            {field.map((id, fieldIndex) => (
              <Box key={imgIds[fieldIndex]} position='relative'>
                {Boolean(id) && (
                  <button type='button' className={classes.deleteButton} onClick={() => onImageDelete(fieldIndex, arrayHelpers)}>
                    <DeleteIcon />
                  </button>
                )}

                <FormikFileUploader
                  width='286px'
                  height='286px'
                  onSuccess={(isUpdate) => onUpdateSuccess(isUpdate, arrayHelpers)}
                  onError={() => setIsUploadError(true)}
                  name={`${childFieldName}.${fieldIndex}`}
                  hasUpdatePermission={hasUpdatePermission}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    />
  )
}

export default FormikMultipleFileUploader
