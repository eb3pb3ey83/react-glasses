import { useEffect } from 'react'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { googleSpreadsheetToJson } from '.'
import apiKey from '../base/apiKey'
import getNavigatorLanguage from 'src/utils/getNavigatorLanguage'
import { useNoCacheQuery } from '../base/hooks'

export default function useSpreadsheet() {
  const { isFetched, data: resources } = useNoCacheQuery(apiKey.googleSpreadSheet, googleSpreadsheetToJson)

  useEffect(() => {
    const currentLanguage = window.localStorage.getItem('language')
    const navigatorLanguage = getNavigatorLanguage()

    if (!currentLanguage) {
      window.localStorage.setItem('language', navigatorLanguage)
    }

    i18n.use(initReactI18next).init({
      resources,
      lng: !currentLanguage ? navigatorLanguage : currentLanguage, // 預設語言
      fallbackLng: 'zh-TW', // 如果當前切換的語言沒有對應的翻譯則使用這個語言，
      interpolation: {
        escapeValue: false,
      },
    })
  }, [isFetched])

  return { isFetched }
}
