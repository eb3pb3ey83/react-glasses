import { Button } from '../../../services/menuButton/model'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { intersection, isEmpty, xor } from 'lodash'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { CreateRoleModel } from 'src/pages/Role/services/createRole/model'
import { getRoleList } from 'src/pages/Role/services/role'
import { FormErrors } from '../context'
import { isChinese, isEnglish } from 'src/utils/regexp'

const useFormConfig = (mutate: (data: CreateRoleModel) => unknown) => {
  const defaultIds: number[] | [] = []

  const role_name_schema = Yup.string()
    .required('此為必填欄位')
    .test('checkNameUnique', '角色名稱已重複', (value) =>
      getRoleList({ keyword: value }).then((response) => {
        return response.data.result_data.length === 0
      }),
    )

  const Schema = Yup.object().shape({
    role_name_ch: role_name_schema.matches(isChinese, '請輸入中文'),
    role_name_en: role_name_schema.matches(isEnglish, '請輸入英文'),

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
    mutate(data)
  }

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
