import React from 'react'
import { IconProps } from './model'

const IconToImg: React.FC<IconProps> = ({ src }: IconProps) => {
  const [imageSrc, setImageSrc] = React.useState('')

  React.useEffect(() => {
    import(`src/assets/icon/${src}.svg`).then((value) => {
      setImageSrc(value.default)
    })
  }, [src])

  return <img style={{ marginRight: '14px' }} src={imageSrc} alt='' />
}

export default IconToImg
