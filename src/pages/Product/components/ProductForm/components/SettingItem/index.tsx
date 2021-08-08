import React from 'react'
import { Box, Checkbox, FormControlLabel } from '@material-ui/core'
import FormikField from 'src/shared/components/FormikField'
import { useTranslation } from 'react-i18next'
import { Props } from './model'
// import useStyles from './useStyles'

const SettingItem = ({ isFirstItem, isLastItem }: Props) => {
  // const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box
      style={{ background: '#fff' }}
      marginTop={isFirstItem ? '24px' : '0'}
      borderRadius='8px'
      marginBottom={isLastItem ? '0' : '16px'}
      border='1px solid #D9DADB'
      padding='16px 28px 16px 16px'
    >
      <Box>
        <FormControlLabel label='test' control={<Checkbox />} />
      </Box>

      <Box display='grid' position='relative' gridTemplateColumns='140px 140px 196px 196px' gridColumnGap='24px'>
        <FormikField style={{ marginTop: '11px' }} name='test' label={t('product.settingItemRange')} />
        <Box position='absolute' bottom='20px' left='148px' lineHeight='0'>
          -
        </Box>
        <FormikField style={{ marginTop: '11px' }} name='test' />
        <FormikField style={{ marginTop: '11px' }} name='test' label={t('product.settingItemStep')} />
        <FormikField style={{ marginTop: '11px' }} name='test' label={t('product.settingItemPlace')} />
      </Box>
    </Box>
  )
}

export default SettingItem
