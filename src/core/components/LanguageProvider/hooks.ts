import React from 'react'
import { I18n } from './model'

export const useLanguage = () => {
  const { language, setLanguage } = React.useContext(I18n)

  return { language, setLanguage }
}
