import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { CreateBannerData, CreateBannerModel } from 'src/shared/services/createBanner/model'

const useFormConfig = (mutate: (data: CreateBannerModel) => unknown) => {
  const { t } = useTranslation()

  const Schema = Yup.object().shape({
    ban_title: Yup.string().required(t('validation.required')),
    ban_web_img_id: Yup.number().required(t('validation.required')),
  })

  const { control, handleSubmit, setValue, errors, register } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      ban_title: '',
      ban_web_img_id: null,
    },
  })

  const onSubmit = (data: CreateBannerData) => {
    mutate({ data: [data], ban_type: '1' })
  }

  return {
    control,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    register,
  }
}

export default useFormConfig
