import React from 'react'
import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import { Props } from './model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const CheckBoxGroup: React.FC<Props> = ({ title, children, handleSelectAll, isSelectAll, isIndeterminate, disabled }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box className={classes.container}>
      <Box display='flex' alignItems='center' marginBottom='3px'>
        {title && (
          <Typography className={classes.title} variant='h6'>
            {title}
          </Typography>
        )}
        <FormControlLabel
          control={<Checkbox disabled={disabled} indeterminate={isIndeterminate} checked={isSelectAll} onChange={handleSelectAll} name='gilad' />}
          label={t('role.selectAll')}
        />
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default CheckBoxGroup
