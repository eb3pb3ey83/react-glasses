import { Box, MenuItem } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'src/shared/components/Select'
import SingleAutoComplete from 'src/shared/components/SingleAutoComplete'
import { Props } from './model'

const Control: React.FC<Props> = ({ searchKeyword, searchRoleType }) => {
  const keywordName = 'roleKeywords'
  const keyWordFromStorage = window.localStorage.getItem(keywordName)
  const { t } = useTranslation()

  let currentKeyWord: string[] | [] = []

  if (keyWordFromStorage) {
    currentKeyWord = JSON.parse(keyWordFromStorage) as string[]
  }

  const onInputSearch = (keyword: string) => {
    searchKeyword(keyword)
  }

  const onSelectChange = (event: React.ChangeEvent<{ value: '0' | '1' | '2' }>) => {
    searchRoleType(event.target.value)
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <SingleAutoComplete pageKeywordName={keywordName} placeholder={t('role.name')} onSubmit={onInputSearch} options={currentKeyWord} />

      <Select defaultValue='0' width={140} placeholder={t('select.selectArea')} onChange={onSelectChange}>
        <MenuItem value='0'>{t('select.all')}</MenuItem>
        <MenuItem value='1'>{t('select.national')}</MenuItem>
        <MenuItem value='2'>{t('select.international')}</MenuItem>
      </Select>
    </Box>
  )
}

export default Control
