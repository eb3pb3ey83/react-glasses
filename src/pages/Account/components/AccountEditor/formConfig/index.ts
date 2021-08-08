import { isEnglish } from './../../../../../utils/regexp'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { FormErrors } from '../context'
import { FormModel } from './model'
import { UpdateAccountModel } from 'src/pages/Account/services/updateAccount/model'
import { AccountInfoModel } from 'src/pages/Account/services/accountInfo/model'
import { isChinese } from 'src/utils/regexp'
import { useTranslation } from 'react-i18next'

const useFormConfig = (mutate: (data: UpdateAccountModel) => unknown, accountId: number, accountInfo?: AccountInfoModel) => {
  const { t } = useTranslation()

  const Schema = Yup.object().shape({
    user_name_ch: Yup.string().required(t('validation.required')).matches(isChinese, t('account.chNameError')),
    user_name_en: Yup.string().required(t('validation.required')).matches(isEnglish, t('account.enNameError')),
    mainDeptId: Yup.number().required(t('account.deptPlaceholder')),
    // sub_deptId: Yup.number().required('請選擇子部門'),
    roles: Yup.array()
      .transform((ids) => {
        return ids.filter((id: number) => {
          return id === 0 || id
        })
      })
      .min(1, t('validation.roleRequired')),
  })

  const roles = accountInfo?.roles.map((role) => role.id)
  const sub_dept = accountInfo?.dept.sub_dept

  const { control, handleSubmit, getValues, formState, setValue, errors, register, watch } = useForm<FormModel>({
    resolver: yupResolver(Schema),
    defaultValues: {
      mainDeptId: Number(accountInfo?.dept.id),
      sub_deptId: sub_dept?.id,
      email: accountInfo?.email,
      roles: roles,
      user_name_ch: accountInfo?.user_name_ch,
      user_name_en: accountInfo?.user_name_en,
      openFlag: accountInfo?.open_flag,
    },
  })

  const watchedMainDeptId = watch('mainDeptId')
  const watchedSubDeptId = watch('sub_deptId')
  const watchedRoles = watch('roles')
  const watchedOpenFlag = watch('openFlag')
  const formErrors = errors as FormErrors
  const removeItem = (itemList: number[], currentId: number) => itemList?.filter((item) => item !== currentId)

  const handleCheck = (currentId: number) => {
    const itemList = getValues().roles as number[]

    return [...(itemList ?? []), currentId]
  }

  const onSubmit = (data: FormModel) => {
    const openFlag = data.openFlag as '0' | '1'
    const isAccountInvalid = !openFlag

    mutate({
      id: accountId,
      updateData: {
        dept_id: data.sub_deptId ? data.sub_deptId : (data.mainDeptId as number),
        roles: data.roles,
        user_name_ch: data.user_name_ch,
        user_name_en: data.user_name_en,
        open_flag: isAccountInvalid ? '2' : openFlag,
      },
    })
  }

  return {
    control,
    isFormDirty: formState.isDirty,
    handleSubmit,
    handleCheck,
    removeItem,
    setValue,
    onSubmit,
    errors: formErrors,
    register,
    watchedMainDeptId,
    watchedSubDeptId,
    watchedRoles,
    watchedOpenFlag,
  }
}

export default useFormConfig
