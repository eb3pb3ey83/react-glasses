import { FormHelperText } from '@material-ui/core'
import React from 'react'
import { Props } from './model'
import FileUploader from 'src/shared/components/FileUploader'
import FileHelperText from 'src/shared/components/HelperText'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import useStyles from './useStyles'

type ControllerProps = ControllerRenderProps<Record<string, unknown>>

const Image: React.FC<Props> = ({ disabled, size, name, control, isHidden }) => {
  const [imageSrc, setImageSrc] = React.useState('')
  const classes = useStyles()
  const isBigSize = size === 'big'

  const onUploadSuccess = (props: ControllerProps, id: number | null, src: string) => {
    props.onChange(id)
    setImageSrc(src)
  }

  return (
    <>
      <FormHelperText className={classes.bannerText}>電腦版橫幅</FormHelperText>
      <Controller
        name={name}
        render={(props) => (
          <>
            <FileUploader
              readonly={disabled}
              width={isBigSize ? '588px' : '460px'}
              height={isBigSize ? '430px' : '163px'}
              onError={() => null}
              error={false}
              onSuccess={(id, src) => onUploadSuccess(props, id, src)}
              src={imageSrc}
              style={{ display: isHidden ? 'none' : 'block' }}
            />
            <FileHelperText title='照片規範'>
              建議尺寸：822x 768｜檔案類型：jpg, png, gif｜檔案大小：5 M｜照片檔名：不包含特殊符號 (e.g. $, &)
            </FileHelperText>
          </>
        )}
        control={control}
      />
    </>
  )
}

export default Image
