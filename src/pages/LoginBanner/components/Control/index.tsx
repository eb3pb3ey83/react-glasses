import { Box, MenuItem } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'src/shared/components/Select'
import { Props } from './model'

const Control: React.FC<Props> = ({ searchCountryType }) => {
  const { t } = useTranslation()

  const onSelectChange = (event: React.ChangeEvent<{ value: 1 | 2 }>) => {
    searchCountryType(event.target.value)
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <Select defaultValue={1} width={140} placeholder={t('news.selectAreaPlaceholder')} onChange={onSelectChange}>
        <MenuItem value={1}>{t('select.national')}</MenuItem>
        <MenuItem value={2}>{t('select.international')}</MenuItem>
      </Select>
    </Box>
  )
}

export default Control
