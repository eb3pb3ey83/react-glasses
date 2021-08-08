import { UpdateBannerData, UpdateBannerModel } from '../../../../../shared/services/updateBanner/model'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { BannerInfo } from 'src/shared/services/getBannerInfo/model'
import React from 'react'

const useFormConfig = (mutate: (data: UpdateBannerModel) => unknown, id: string, isBannerInfoFetched: boolean, bannerInfo?: BannerInfo) => {
  const Schema = Yup.object().shape({
    ban_title: Yup.string().required('請輸入標題'),
  })

  const { control, handleSubmit, setValue, errors, register, watch } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      ban_title: '',
      ban_web_img_id: 0,
    },
  })

  const currentImageId = watch('ban_web_img_id')

  const onSubmit = (data: UpdateBannerData) => {
    mutate({ data: [data], id })
  }

  React.useLayoutEffect(() => {
    if (bannerInfo && isBannerInfoFetched) {
      setValue('ban_title', bannerInfo.banner_content.ban_title)
      !currentImageId && setValue('ban_web_img_id', bannerInfo.banner_content.ban_web_img_id)
    }
  }, [isBannerInfoFetched, bannerInfo, control])

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
