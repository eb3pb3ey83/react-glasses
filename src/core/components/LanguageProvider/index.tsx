import React from 'react'
import getNavigatorLanguage from 'src/utils/getNavigatorLanguage'
import { I18n } from './model'

const getCurrentLanguage = () => {
  const currentLanguage = window.localStorage.getItem('language')
  return !currentLanguage ? getNavigatorLanguage() : currentLanguage
}

const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = React.useState(getCurrentLanguage)

  return <I18n.Provider value={{ language, setLanguage }}>{children}</I18n.Provider>
}

export default LanguageProvider
