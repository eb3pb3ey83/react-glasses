import FormHelperText from '@material-ui/core/FormHelperText'
import React from 'react'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import { ReactComponent as WarningIcon } from 'src/assets/icon/warning-icon.svg'
import { Props } from './model'
import FileHelperText from 'src/shared/components/HelperText'
import FileUploader from 'src/shared/components/FileUploader'
import InputField from 'src/shared/components/BlueFormContainer/InputField'
import { useTranslation } from 'react-i18next'
import { Box } from '@material-ui/core'
import useStyles from './useStyles'

type ControllerProps = ControllerRenderProps<Record<string, unknown>>

const BannerModifier: React.FC<Props> = ({ control, register, errors, imageUrl, hasUpdatePermission }) => {
  const [imageSrc, setImageSrc] = React.useState('')
  const [webImageSrc, setWebImageSrc] = React.useState('')
  const [isUploadCoverError, setIsUploadCoverError] = React.useState(false)
  const isImageFieldError = Boolean(errors?.ban_web_img_id)
  const classes = useStyles()
  const { t } = useTranslation()

  const onUploadSuccess = (props: ControllerProps, id: number | null, src: string) => {
    isUploadCoverError && setIsUploadCoverError(false)
    props.onChange(id)
    setImageSrc(src)
  }

  React.useEffect(() => {
    const isApiUrl = imageUrl?.includes('https://')
    const isFirstTimeSetApiUrl = imageUrl && !webImageSrc && isApiUrl
    const isLocalUrl = imageUrl && !isApiUrl

    isLocalUrl && setImageSrc(imageUrl as string)
    isFirstTimeSetApiUrl && setImageSrc(imageUrl as string)
    isFirstTimeSetApiUrl && setWebImageSrc(imageUrl as string)
  }, [imageUrl])

  return (
    <div className={classes.container}>
      <Box marginTop='24px' marginBottom='8px' display='flex' justifyContent='flex-start' alignItems='center'>
        <FormHelperText className={classes.bannerText}>{t('banner.desktop')}</FormHelperText>

        {isUploadCoverError && (
          <span className={classes.labelError} style={{ marginLeft: '8px' }}>
            <WarningIcon />
            {t('image')}
          </span>
        )}

        {isImageFieldError && !isUploadCoverError && (
          <span className={classes.labelError} style={{ marginLeft: '8px' }}>
            <WarningIcon />
            {t('img.pleaseAddLoginBanner')}
          </span>
        )}
      </Box>
      <Controller
        name='ban_web_img_id'
        render={(props) => (
          <>
            <FileUploader
              hasUploadPermission={hasUpdatePermission}
              width='460px'
              height='430px'
              readonly={!hasUpdatePermission}
              onError={() => setIsUploadCoverError(true)}
              error={isImageFieldError || isUploadCoverError}
              onSuccess={(id, src) => onUploadSuccess(props, id, src)}
              src={imageSrc}
            />
            <FileHelperText title={t('img.specifications')}>
              {`${t('img.dimension')}：822x 768｜${t('img.type')}：jpg, png, gif｜${t('img.size')}：5 M｜${t('img.name')}：${t(
                'img.symbols',
              )} (e.g. $, &)`}
            </FileHelperText>
          </>
        )}
        control={control}
      />
      <InputField
        ref={register}
        name='ban_title'
        label={t('title.title')}
        disabled={!hasUpdatePermission}
        placeholder={t('blueForm.titlePlaceholder')}
        error={errors && !!errors?.ban_title}
        errorMessage={errors && errors?.ban_title?.message}
      />
      <FileHelperText title={t('addBanner.title')} />
    </div>
  )
}

BannerModifier.defaultProps = {
  hasUpdatePermission: true,
}

export default BannerModifier
