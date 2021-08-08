import React from 'react'
import IconToImg from 'src/shared/components/IconDecide/IconToImg'
import { validFileType, validFileSize, removeFileExe, Props } from './model'
import { specialCHAExisted } from 'src/utils/validator/specialChaChecker'
import { ReactComponent as ImgUpload } from 'src/assets/icon/uploadImg-icon.svg'
import { usePostImage } from 'src/pages/News/services/uploadImg/hooks'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const FileUploader: React.FC<Props> = ({
  readonly = false,
  width = '460px',
  height = '345px',
  style,
  onError,
  error,
  onSuccess,
  src,
  limitedSize,
}) => {
  const classes = useStyles()
  const { mutate } = usePostImage()
  const { t } = useTranslation()

  const doFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly) return
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const curFile = e.target.files[0]
    const acceptArr = e.target.accept.split(', ')
    const exeNameRemoved = removeFileExe(curFile.name, acceptArr)
    if (!validFileType(curFile) || !validFileSize(curFile) || specialCHAExisted(exeNameRemoved)) {
      onError()
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(curFile)
    reader.onload = function (loadev) {
      const localImg = new Image()
      if (!loadev.target || !loadev.target.result) {
        return
      }
      localImg.src = loadev.target.result as string
      localImg.onload = function () {
        const imgheight = localImg.height
        const imgwidth = localImg.width
        if (limitedSize && (imgheight > limitedSize.height || imgwidth > limitedSize.width)) {
          onError()
          return
        }
        mutate(curFile, {
          onSuccess: (data) => {
            if (!data.data.result_data[curFile.name]) throw new Error('internal server error')
            onSuccess(data.data.result_data[curFile.name], localImg.src)
          },
          onError: () => {
            onError()
          },
        })
      }
    }
  }

  const clearValue = (e: React.MouseEvent<HTMLInputElement>) => {
    if (readonly) return
    let target = e.target as HTMLInputElement
    target.value = ''
  }

  return (
    <div style={{ width, height, ...style }} className={`${classes.fileUploader} ${error ? 'error' : ''}`}>
      <div className={classes.loaderCover}>
        {!src ? (
          <div className={classes.loaderInstruction}>
            <IconToImg src='uploadFile-icon' />
            <div className={`${classes.hint} dragToHere`}>{t('img.drag')}</div>
            <div className={`${classes.hint} or`}>- {t('img.or')} -</div>
            <div className={classes.fromComputer}>{t('img.select')}</div>
          </div>
        ) : (
          <div className={classes.previewArea}>
            {!readonly && (
              <div className='uploadBtn'>
                <ImgUpload />
                {t('img.upload')}
              </div>
            )}
            <div className='previewImg' style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
        )}
      </div>
      <input
        name='imgLoader'
        accept='.png, .jpg, .jpeg, .gif, .jfif, .pjpeg, .pjp'
        className={classes.inputComponent}
        type='file'
        disabled={readonly}
        onChange={doFileChange}
        onClick={clearValue}
      />
    </div>
  )
}

FileUploader.defaultProps = {
  hasUploadPermission: true,
}

export default FileUploader
