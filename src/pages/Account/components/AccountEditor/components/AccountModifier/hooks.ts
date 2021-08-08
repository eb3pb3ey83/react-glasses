import React from 'react'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import { RoleResponseModel } from 'src/pages/Account/services/role/model'
import { Items } from 'src/shared/components/MultipleSelect/model'
import { FormToolsContext } from '../../context'

export const useSelectedRoleList = (roleList: RoleResponseModel[]) => {
  const [selectedRoleList, setSelectedRoleList] = React.useState<Items[] | []>([])
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'
  const context = React.useContext(FormToolsContext)
  const formValue = context?.watchedRoles

  const findRoleName = (currentId: number) => {
    const currentItem = roleList.find((item) => item.id === currentId)
    return isChinese ? currentItem?.role_name_ch : currentItem?.role_name_en
  }

  const getSelectedRoles = (list: number[]) => {
    return list.map((id) => ({ id, name: findRoleName(id) as string }))
  }

  React.useEffect(() => {
    formValue && setSelectedRoleList(getSelectedRoles(formValue))
  }, [formValue])

  return { selectedRoleList }
}
