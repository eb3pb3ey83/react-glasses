import React from 'react'
import { CountyRoleType } from 'src/pages/model'
import { SysLanguageItem } from '../components/RadioGroupWithLabel/services/SystemLanguage/model'

export const useAreaValue = () => {
  const { roleType, langListForign, langListLocal } = React.useContext(CountyRoleType)

  const defaultCounty = React.useMemo(() => {
    return roleType === '0' ? 1 : Number(roleType)
  }, [roleType])

  const [areaValue, setAreaValue] = React.useState<number | string>(defaultCounty || 1)

  const tablist = React.useMemo(() => {
    return areaValue === 1 ? langListLocal : langListForign
  }, [areaValue, langListForign, langListLocal])

  const formList = tablist?.map((item) => ({ language: item.code_no }))

  return { areaValue, setAreaValue, tablist: tablist as SysLanguageItem[], formList }
}
