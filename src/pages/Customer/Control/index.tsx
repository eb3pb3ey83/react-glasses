import { Box, MenuItem } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'src/shared/components/Select'
import SingleAutoComplete from 'src/shared/components/SingleAutoComplete'
import { Props } from './model'

const Control: React.FC<Props> = ({ searchKeyword, searchCountryType, changeFlag }) => {
  const keywordName = 'companyKeywords'
  const keyWordFromStorage = window.localStorage.getItem(keywordName)
  const { t } = useTranslation()

  let currentKeyWord: string[] | [] = []

  if (keyWordFromStorage) {
    currentKeyWord = JSON.parse(keyWordFromStorage) as string[]
  }

  const onInputSearch = (keyword: string) => {
    searchKeyword(keyword)
  }

  const onSelectChange = (event: React.ChangeEvent<{ value: 'all' | '1' | '2' }>) => {
    searchCountryType(event.target.value)
  }

  const onOpenFlagChange = (event: React.ChangeEvent<{ value: 'all' | '0' | '1' | '2' }>) => {
    changeFlag(event.target.value)
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <SingleAutoComplete pageKeywordName={keywordName} placeholder={t('contact.placeholder')} onSubmit={onInputSearch} options={currentKeyWord} />
      <div>
        {
          <Select
            defaultValue=''
            inputProps={{ placeholder: t('news.selectAreaPlaceholder'), style: { color: 'transparent' } }}
            width={180}
            onChange={onSelectChange}
            style={{ marginRight: '16px' }}
          >
            <MenuItem value='all'>{t('select.all')}</MenuItem>
            <MenuItem value='1'>{t('select.national')}</MenuItem>
            <MenuItem value='2'>{t('select.international')}</MenuItem>
          </Select>
        }
        <Select
          defaultValue=''
          inputProps={{ placeholder: t('select.section1'), style: { color: 'transparent' } }}
          width={180}
          onChange={onOpenFlagChange}
        >
          <MenuItem value='all'>{t('select.section2')}</MenuItem>
          <MenuItem value='1'>{t('select.enable')}</MenuItem>
          <MenuItem value='0'>{t('select.disable')}</MenuItem>
          <MenuItem value='2'>{t('select.section3')}</MenuItem>
        </Select>
      </div>
    </Box>
  )
}

export default Control
