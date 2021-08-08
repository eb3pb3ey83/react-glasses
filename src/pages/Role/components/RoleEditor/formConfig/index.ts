import { UpdateRoleModel } from './../../../services/updateRole/model'
import React from 'react'
import { RoleInfoModel } from './../../../services/roleInfo/model'
import { Button } from '../../../services/menuButton/model'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { intersection, isEmpty, xor } from 'lodash'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { FormErrors } from '../context'
import { CreateRoleModel } from 'src/pages/Role/services/createRole/model'
import { isChinese, isEnglish } from 'src/utils/regexp'

const useFormConfig = (mutate: (data: UpdateRoleModel) => unknown, roleId: number, roleInfo?: RoleInfoModel, isRoleInfoFetched?: boolean) => {
  const defaultIds: number[] = []

  const Schema = Yup.object().shape({
    role_name_ch: Yup.string().required('此為必填欄位').matches(isChinese, '請輸入中文'),
    role_name_en: Yup.string().required('此為必填欄位').matches(isEnglish, '請輸入中文'),

    menus_buttons_id: Yup.array()
      .transform((ids) => {
        return ids.filter((id: number) => {
          return id === 0 || id
        })
      })
      .min(1, '請至少勾選一個功能'),
  })

  const { control, handleSubmit, getValues, setValue, watch, errors, register } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      role_type: 0,
      role_name_en: '',
      role_name_ch: '',
      menus_buttons_id: defaultIds,
    },
  })

  const formErrors = errors as FormErrors
  const selectedList = watch('menus_buttons_id')
  const removeItem = (itemList: number[], currentId: number) => itemList?.filter((item) => item !== currentId)

  const handleCheck = (currentId: number, menuButtons: Button[]) => {
    const itemList = getValues().menus_buttons_id as number[]
    const isSelected = Boolean(itemList.find((value: number) => value === currentId))
    const queryItemId = menuButtons.find((item) => item.button_code.includes('qry'))?.id

    const newIds = isSelected ? removeItem(itemList, currentId) : [...(itemList ?? []), currentId, queryItemId]

    return newIds
  }

  const handleSelectAll = (buttons: Button[]) => {
    const allIds = buttons.map((item) => item.id)
    const isSelectAll = intersection(allIds, selectedList).length === allIds.length

    if (isSelectAll) {
      setValue('menus_buttons_id', xor(selectedList, allIds))
    } else {
      setValue('menus_buttons_id', [...(selectedList ?? []), ...allIds])
    }
  }

  const checkIsSelectAll = (buttons: Button[]) => {
    const allIds = buttons?.map((item) => item.id)
    const isSelectAll = intersection(allIds, selectedList)?.length === allIds?.length

    return isSelectAll
  }

  const checkIsIndeterminate = (buttons: Button[]) => {
    const allIds = buttons?.map((item) => item.id)
    const selectIdsInGroup = intersection(allIds, selectedList)
    const isSelectAll = selectIdsInGroup?.length === allIds?.length

    return !isSelectAll && selectIdsInGroup.length > 0
  }

  const hasSelectItem = !isEmpty(selectedList)

  const onSubmit = (data: CreateRoleModel) => {
    mutate({ updateData: data, id: roleId })
  }

  React.useLayoutEffect(() => {
    if (roleInfo && isRoleInfoFetched) {
      const ids: number[] = roleInfo.menus
        .flatMap((item) => item.menusbuttons)
        .filter((button) => button.open_flag === '1')
        .map((button) => button.id)

      // 因 react hook form 目前有抓不到 api 資料的問題, 所以先用settimeout等資料回來, 之後找到解決方案後將移除
      setTimeout(() => {
        setValue('role_type', Number(roleInfo.role_type))
        setValue('role_name_en', roleInfo.role_name_en)
        setValue('role_name_ch', roleInfo.role_name_ch)
        setValue('menus_buttons_id', ids)
      }, 200)
    }
  }, [isRoleInfoFetched, roleInfo, control])

  return {
    control,
    handleSubmit,
    handleSelectAll,
    checkIsSelectAll,
    checkIsIndeterminate,
    handleCheck,
    hasSelectItem,
    selectedList,
    setValue,
    onSubmit,
    errors: formErrors,
    register,
  }
}

export default useFormConfig
