import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import passwordValidator from 'src/utils/validator/passwordValidator'
import { UseMutateFunction } from 'react-query'
import { TokenModel } from 'src/reset/service/patchResetPassword/model'
import { useTranslation } from 'react-i18next'

const useFormConfig = (mutate: UseMutateFunction<unknown, unknown, TokenModel, unknown>, token: string) => {
  const { t } = useTranslation()
  const schema = yup.lazy((values) => {
    return yup.object().shape({
      password: passwordValidator(t('login1'), t('validation.required')),
      confirmPassword: passwordValidator(t('login1'), t('validation.required')).test('isPasswordSame', t('login2'), (confirmPassword) => {
        return confirmPassword === values.password
      }),
    })
  })

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    mutate({ password: data.password, token })
  }

  return { register, handleSubmit, onSubmit, errors }
}

export default useFormConfig
