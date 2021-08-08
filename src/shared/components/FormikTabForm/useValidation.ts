import { useFormikContext } from 'formik'
import React from 'react'
import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { ErrorDetailList } from './model'

export const useValidation = (tablist: SysLanguageItem[]) => {
  const { isSubmitting, isValidating } = useFormikContext()
  const [langTab, setLangTab] = React.useState<string | number>(0)
  const [errorDetailList, setErrorDetailList] = React.useState<ErrorDetailList | null>(null)
  const currentTab = tablist && tablist[Number(langTab)].code_no

  const triggerErrorTab = () => {
    if (!tablist || !errorDetailList) return

    tablist.forEach((tabItem: SysLanguageItem, tabIndex: number) => {
      if (errorDetailList.tab.includes(tabItem.code_no)) {
        setLangTab(tabIndex)
      }
    })
  }

  const setError = (error: ErrorDetailList) => {
    setErrorDetailList(error)
  }

  React.useEffect(() => {
    if (isValidating) {
      setErrorDetailList(null)
    }

    if (!isSubmitting && errorDetailList) {
      triggerErrorTab()
    }
  }, [isSubmitting, errorDetailList])

  return { currentTab, errorDetailList, langTab, setLangTab, setError }
}
