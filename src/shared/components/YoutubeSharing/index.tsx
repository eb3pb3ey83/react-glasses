import React from 'react'
import Input from 'src/shared/components/Input'
import { ReactComponent as ErrorIcon } from 'src/assets/icon/warning-icon.svg'
import PlayIcon from 'src/assets/icon/filmPlay-icon.svg'
import { Props } from './model'
import useStyles from './useStyles'

function getId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ''
}

function YoutubeSharing({ onURLChange, url, readonly = false }: Props) {
  const classes = useStyles()
  const [youtubeId, setYoutubeId] = React.useState<string>('')
  const [isIdInvalid, setIdInvalid] = React.useState<boolean>(false)
  const [showCover, setShowCover] = React.useState<boolean>(true)
  const timer = React.useRef<NodeJS.Timeout>()
  const WAIT_INTERVAL = 500

  const onInputChange = (localUrl: string) => {
    if (readonly) return
    const triggerChange = () => {
      if (!localUrl) {
        setIdInvalid(false)
        setYoutubeId('')
        onURLChange('', false)
        setShowCover(true)
        return
      }
      const getYoutubeId = getId(localUrl)
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=id&id=${getYoutubeId}&key=AIzaSyDXCmcSVbkoyJP2cljdnPLY4rTvOEO6Yr8`)
        .then((response) => response.json())
        .then((data) => {
          if (data.items.length === 0) {
            setIdInvalid(true)
            setYoutubeId('')
            setShowCover(true)
            onURLChange(localUrl, true)
          } else {
            setYoutubeId(getYoutubeId)
            setIdInvalid(false)
            setShowCover(false)
            onURLChange(localUrl, false)
          }
        })
    }
    if (timer.current) {
      clearTimeout(timer.current)
    }
    onURLChange(localUrl, false)
    timer.current = setTimeout(triggerChange, WAIT_INTERVAL)
  }

  React.useEffect(() => {
    onInputChange(url)
  }, [url])

  const youtubeFram = React.useMemo(() => {
    return (
      <iframe
        width='100%'
        height='366px'
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className={showCover ? 'iframError' : ''}
      ></iframe>
    )
  }, [youtubeId])

  return (
    <div className={classes.youtubeSharing}>
      {youtubeFram}
      <div className={`${classes.frameCover} ${showCover ? 'showCover' : ''}`}>
        <img src={PlayIcon} alt='' />
      </div>
      <Input
        readOnly={readonly}
        disabled={readonly}
        error={isIdInvalid}
        placeholder='請輸入youtube影片鏈結'
        className={classes.youtubeInput}
        value={url}
        height='40px'
        onChange={(e: { target: { value: string } }) => onInputChange(e.target.value)}
      />
      {isIdInvalid && (
        <div className={classes.errorText}>
          <ErrorIcon />
          找不到此影片
        </div>
      )}
    </div>
  )
}

export default YoutubeSharing
