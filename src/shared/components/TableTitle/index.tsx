import { Box, Typography } from '@material-ui/core'
import React from 'react'
import plusIconSrc from 'src/assets/icon/plus.svg'
import Button from 'src/shared/components/Button'
import { Props } from './model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const TableTitle: React.FC<Props> = ({ onClick, btnIsWhite = false, btnStyle, startIcon, label, subTitle, title, hasPermission = false }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <>
      <Box marginBottom='20px' color='#153C7B'>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h3'>{title}</Typography>
          {hasPermission && (
            <Button
              className={`${classes.tableTitleBtn} ${btnIsWhite ? 'white' : ''}`}
              style={{ padding: '0 14px', height: '40px', ...btnStyle }}
              onClick={onClick}
              fullWidth={false}
              type='button'
              startIcon={startIcon || <img src={plusIconSrc} alt='' />}
            >
              {label || t('button.addbutton')}
            </Button>
          )}
        </Box>
        {subTitle && <Typography className={classes.subtitle}>{subTitle}</Typography>}
      </Box>
    </>
  )
}

export default TableTitle
