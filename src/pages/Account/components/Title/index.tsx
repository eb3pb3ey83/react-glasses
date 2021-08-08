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
    <Box display='flex' justifyContent='space-between' marginBottom='20px' color='#153C7B'>
      <Typography variant='h3'>{t('account.title')}</Typography>
      {hasAddButton && (
        <Button height={40} onClick={openDrawer} fullWidth={false} type='button' startIcon={<img src={plusIconSrc} alt='' />}>
          {t('button.addbutton')}
        </Button>
      )}
    </Box>
  )
}

export default Title
