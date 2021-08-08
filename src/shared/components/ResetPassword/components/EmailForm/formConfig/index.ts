import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import emailValidator from 'src/utils/validator/emailValidator'
import { LoginModel } from 'src/login/services/login'
import { useTranslation } from 'react-i18next'

const useFormConfig = (mutate: (data: LoginModel) => unknown) => {
  const { t } = useTranslation()

  const schema = yup.object().shape({
    email: emailValidator(t('validation.emailInvalid'), t('validation.required')),
  })

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: LoginModel) => {
    mutate(data)
  }

  return { register, handleSubmit, onSubmit, errors }
}

export default useFormConfig
