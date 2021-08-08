import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import plusIconSrc from 'src/assets/icon/plus.svg'
import Button from 'src/shared/components/Button'
import authConfig from 'src/utils/authConfig'
import { Props } from './model'

const Title: React.FC<Props> = ({ openDrawer }) => {
  const hasAddButton = authConfig.getPermissions('role:add')
  const { t } = useTranslation()

  return (
    <Box marginBottom='20px' color='#153C7B'>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h3'>{t('faqPages.pageTitle')}</Typography>
        {hasAddButton && (
          <Button width={85} height={40} onClick={openDrawer} fullWidth={false} type='button' startIcon={<img src={plusIconSrc} alt='' />}>
            新增
          </Button>
        )}
      </Box>
      <Typography variant='subtitle2'>請透過拖曳列表編輯橫幅的排序，前台會依照此列表的排序顯示橫幅</Typography>
    </Box>
  )
}

export default Title
