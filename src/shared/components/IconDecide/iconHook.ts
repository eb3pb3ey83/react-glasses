import React, { useState } from 'react'

// export const useDynamicImg = (src: string) => {
//   let svgComponentRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>()
//   React.useEffect(() => {
//     const importIcon = async (): Promise<void> => {
//       //Webpack plugin that adds the ReactComponent to each SVG that is imported somehow does not trigger on dynamic imports.
//       const icon = await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!src/assets/icon/${src}.svg`)
//       svgComponentRef.current = icon.default
//     }
//     importIcon()
//   }, [src])
//   if (svgComponentRef.current) {
//     const { current: ImportedIcon } = svgComponentRef
//     return ImportedIcon
//   }
//   return null
// }
import { MenuInfo } from 'src/shared/components/Menu/model'
export const useDynamicImg = (menuData?: MenuInfo[]) => {
  const [dyimgs, setDyimgs] = useState<{ id: number; icon: React.FC<React.SVGProps<SVGSVGElement>> }[]>()
  React.useEffect(() => {
    async function getDyimg() {
      if (menuData) {
        const importIcon = await Promise.all(
          menuData.map(async (item) => {
            if (item.menu_icon) {
              const icon = await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!src/assets/icon/${item.menu_icon}.svg`)
              return { id: item.id, icon: icon.default }
            } else {
              return { id: item.id, icon: null }
            }
          }),
        )
        setDyimgs(importIcon)
      }
    }
    getDyimg()
  }, [])
  if (dyimgs) {
    return dyimgs
  }
  return null
}
