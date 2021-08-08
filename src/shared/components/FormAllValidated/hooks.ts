import React from 'react'
import { SysLanguageItem } from '../RadioGroupWithLabel/services/SystemLanguage/model'
import { Props, ErrorDetailList } from './model'

export const useValidation = ({ tablist, isSubmitted, setIsSubmitted }: Partial<Props>) => {
  const [langTab, setLangTab] = React.useState<string | number>(0)
  const [errorDetailList, setErrorDetailList] = React.useState<ErrorDetailList[] | []>([])
  const currentLanguage = tablist && tablist[Number(langTab)].code_no

  const triggerErrorTab = () => {
    if (!tablist) return

    tablist.forEach((tabItem: SysLanguageItem, tabIndex: number) => {
      if (errorDetailList.map((item: ErrorDetailList) => item.lan).includes(tabItem.code_no)) {
        setLangTab(tabIndex)
      }
    })
  }

  const setError = (error: ErrorDetailList) => {
    const newErrorDetailList = [...errorDetailList, error]
    setErrorDetailList(newErrorDetailList)
  }

  React.useEffect(() => {
    if (isSubmitted && errorDetailList.length > 0) {
      triggerErrorTab()
      setErrorDetailList([])
      setIsSubmitted && setIsSubmitted(false)
    }
  }, [isSubmitted, errorDetailList])

  return { currentLanguage, errorDetailList, langTab, setLangTab, setError }
}
