import React, { useRef } from 'react'
import { IconProps } from './model'

const IconDecide: React.FC<IconProps> = ({ src, ...rest }): JSX.Element | null => {
  let svgComponentRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>()
  const [btnRef, setBtnRef] = React.useState(svgComponentRef)
  React.useEffect(() => {
    const importIcon = async (): Promise<void> => {
      //Webpack plugin that adds the ReactComponent to each SVG that is imported somehow does not trigger on dynamic imports.
      const icon = await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!src/assets/icon/${src}.svg`)
      svgComponentRef = { current: icon.default }
      setBtnRef(svgComponentRef)
    }
    importIcon()
  }, [src])
  if (btnRef.current) {
    const { current: ImportedIcon } = btnRef
    return <ImportedIcon {...rest} />
  }
  return null
}

export default IconDecide
