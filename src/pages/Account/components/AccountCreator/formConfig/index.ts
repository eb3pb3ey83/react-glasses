import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { FormErrors } from '../context'
import { CreateAccountModel } from 'src/pages/Account/services/createAccount/model'
import { getAccountList } from 'src/pages/Account/services/account'
import emailValidator from 'src/utils/validator/emailValidator'
import { FormModel } from './model'
import { isChinese, isEnglish } from 'src/utils/regexp'
import { useTranslation } from 'react-i18next'
import { AlertUnauthContext } from 'src/pages/model'
import React from 'react'

const useFormConfig = (mutate: (data: CreateAccountModel) => unknown) => {
  const { t } = useTranslation()
  const openUnAuthAlert = React.useContext(AlertUnauthContext)

  const user_nameSchema = Yup.string()
    .required(t('validation.required'))
    .test('checkNameUnique', t('validation.accountRepeat'), (value) =>
      getAccountList({ user_name: value }, openUnAuthAlert).then((response) => {
        return response.data.result_data.length === 0
      }),
    )

  const email_schema = emailValidator(t('validation.emailInvalid'), t('validation.required')).test(
    'checkNameUnique',
    t('validation.emailRepeat'),
    (value) =>
      getAccountList({ page: 1 }, openUnAuthAlert).then((response) => {
        return response.data.result_data.every((item) => item.email !== value)
      }),
  )

  const Schema = Yup.object().shape({
    user_name_ch: user_nameSchema.matches(isChinese, t('account.chNameError')),
    user_name_en: user_nameSchema.matches(isEnglish, t('account.enNameError')),
    mainDeptId: Yup.string().required(t('account.mainDeptError')),
    // sub_deptId: Yup.number().required('請選擇子部門'),
    email: email_schema,
    roles: Yup.array()
      .transform((ids) => {
        return ids.filter((id: number) => {
          return id === 0 || id
        })
      })
      .min(1, t('validation.roleRequired')),
  })

  const { control, handleSubmit, getValues, setValue, errors, register, setError, formState } = useForm<FormModel>({
    resolver: yupResolver(Schema),
    defaultValues: {
      mainDeptId: '',
      sub_deptId: '',
      email: '',
      roles: [],
      user_name_ch: '',
      user_name_en: '',
    },
  })

  const formErrors = errors as FormErrors
  const removeItem = (itemList: number[], currentId: number) => itemList?.filter((item) => item !== currentId)

  const handleCheck = (currentId: number) => {
    const itemList = getValues().roles as number[]

    return [...(itemList ?? []), currentId]
  }

  React.useEffect(() => {
    const values = getValues()
    const isSubDeptError = values.mainDeptId && !values.sub_deptId

    if (isSubDeptError) {
      setError('sub_deptId', { message: t('account.subDeptError') })
    }
  }, [formState.submitCount])

  const onSubmit = (data: FormModel) => {
    mutate({
      dept_id: data.sub_deptId ? data.sub_deptId : data.mainDeptId,
      email: data.email,
      roles: data.roles,
      user_name_ch: data.user_name_ch,
      user_name_en: data.user_name_en,
    })
  }

  return {
    control,
    handleSubmit,
    handleCheck,
    removeItem,
    setValue,
    onSubmit,
    errors: formErrors,
    register,
  }
}

export default useFormConfig
