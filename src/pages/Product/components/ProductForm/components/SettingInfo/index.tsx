import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import useGetProductSetting from 'src/pages/Product/services/getProductSetting/hooks'
import LabelTitle from 'src/shared/components/BlueTable/LabelTitle'
import FormikTabForm from 'src/shared/components/FormikTabForm'
import SettingItem from '../SettingItem'

// import FormikTabForm from 'src/shared/components/FormikTabForm'
// import useStyles from './useStyles'

const SettingInfo: React.FC = () => {
  // const classes = useStyles()
  const { t } = useTranslation()
  const { product_id } = useParams<{ product_id: string }>()
  const { data } = useGetProductSetting({ type_id: Number(product_id) })
  const components = [{ setting_type: 'zh-TW' }, { setting_type: 'en-US' }].map((setting_type) => ({
    ...setting_type,
    jsx: [1, 2].map((_item, index, array) => <SettingItem key={index} isFirstItem={index === 0} isLastItem={index === array.length - 1} />),
  }))
  console.log('data2 :>> ', data)

  return (
    <>
      <LabelTitle label={t('product.subSettingLabel')} />
      <FormikTabForm tabName='setting_type' components={components} fieldName='infos' />
    </>
  )
}

export default SettingInfo
