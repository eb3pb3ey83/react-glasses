import React from 'react'

let timeout: null | NodeJS.Timeout = null
export const useDropUp = () => {
  const determineDropUp = () => {
    timeout = setTimeout(() => {
      const control = document.querySelector("div[class$='-control']")
      const menu = control?.nextElementSibling as HTMLElement

      if (!control || !menu) return

      const dialogFooterHeight = 64
      const menuHeight = menu.clientHeight
      const windowHeight = window.innerHeight
      const instOffsetWithMenu = windowHeight - control.getBoundingClientRect().bottom - dialogFooterHeight
      const isDropUpNow = instOffsetWithMenu <= menuHeight

      if (isDropUpNow) {
        menu.style.top = 'auto'
        menu.style.bottom = '100%'
      } else {
        menu.style.top = '100%'
        menu.style.bottom = 'auto'
      }
    }, 500)
  }

  React.useEffect(() => {
    window.addEventListener('resize', determineDropUp)

    return () => {
      clearTimeout(timeout as NodeJS.Timeout)
      window.removeEventListener('resize', determineDropUp)
    }
  }, [])

  return { determineDropUp }
}
