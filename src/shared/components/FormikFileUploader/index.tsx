import { useFormikContext } from 'formik'
import React from 'react'
import FileUploader from '../FileUploader'
import { Props } from './model'

const FormikFileUploader: React.FC<Props> = ({ name, width, height, hasUpdatePermission, imageUrl, onSuccess, onError }) => {
  const [imageSrc, setImageSrc] = React.useState('')
  const [isUpdateImage, setIsUpdateImage] = React.useState(false)
  const [isUploadCoverError, setIsUploadCoverError] = React.useState(false)
  const [webImageSrc, setWebImageSrc] = React.useState('')
  const { errors, setFieldValue, getFieldMeta, values } = useFormikContext<Record<string, unknown>>()
  const isImageFieldError = Boolean(errors[name])

  const onUploadSuccess = React.useCallback(
    (id: number | null, src: string) => {
      setFieldValue(name, id)
      setImageSrc(src)
      setIsUpdateImage(true)
      isUploadCoverError && setIsUploadCoverError(false)
      onSuccess && onSuccess(isUpdateImage)
    },
    [isUpdateImage],
  )

  const onUploadError = React.useCallback(() => {
    setIsUploadCoverError(true)
    onError && onError()
  }, [])

  React.useEffect(() => {
    const isApiUrl = imageUrl?.includes('https://')
    const isFirstTimeSetApiUrl = imageUrl && !webImageSrc && isApiUrl
    const isLocalUrl = imageUrl && !isApiUrl

    isLocalUrl && setImageSrc(imageUrl as string)
    isFirstTimeSetApiUrl && setImageSrc(imageUrl as string)
    isFirstTimeSetApiUrl && setWebImageSrc(imageUrl as string)
  }, [imageUrl])

  React.useEffect(() => {
    const currentField = getFieldMeta(name)

    if (currentField.value) return

    setImageSrc('')
    setIsUpdateImage(false)
  }, [values])

  return (
    <>
      <FileUploader
        hasUploadPermission={hasUpdatePermission}
        width={width}
        height={height}
        readonly={!hasUpdatePermission}
        onError={onUploadError}
        error={isImageFieldError || isUploadCoverError}
        onSuccess={onUploadSuccess}
        src={imageSrc}
      />
    </>
  )
}

export default FormikFileUploader
