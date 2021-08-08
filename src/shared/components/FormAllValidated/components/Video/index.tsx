import React from 'react'
import LabelWithDelete from 'src/shared/components/BlueFormContainer/LabelWithDelete'
import YoutubeSharing from 'src/shared/components/YoutubeSharing'
import { Props } from './model'
import useStyles from './useStyles'

const Video: React.FC<Props> = ({ disabled, isHidden, onRemove, register, url }) => {
  const classes = useStyles()

  const onURLChange = (newUrl: string) => {
    console.log(newUrl)
  }

  return (
    <div className={classes.blockWithDelete} style={{ display: isHidden ? 'none' : 'block' }}>
      {!disabled && <LabelWithDelete text='影片' onClick={onRemove} />}
      {/* <div style={{ marginBottom: '24px', width: '800px', height: '450px', border: '1px solid' }}>我是播放器</div> */}
      <YoutubeSharing readonly={disabled} ref={register} url={url} onURLChange={(newUrl: string) => onURLChange(newUrl)} />
    </div>
  )
}

export default Video
