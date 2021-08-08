import { Box, MenuItem } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import CountryRoleTypeSelect from 'src/shared/components/CountryRoleTypeSelect'
import Select from 'src/shared/components/Select'
import SingleAutoComplete from 'src/shared/components/SingleAutoComplete'
import { Props } from './model'

const Control: React.FC<Props> = ({ searchKeyword, searchRoleType, changeIsPublic }) => {
  const keywordName = 'newsKeywords'
  const { language } = useLanguage()
  const isChinese = language === 'zh-TW'
  const keyWordFromStorage = window.localStorage.getItem(keywordName)
  const { t } = useTranslation()

  let currentKeyWord: string[] | [] = []

  if (keyWordFromStorage) {
    currentKeyWord = JSON.parse(keyWordFromStorage) as string[]
  }

  const onInputSearch = (keyword: string) => {
    searchKeyword(keyword)
  }

  const onSelectChange = (event: React.ChangeEvent<{ value: '1' | '2' }>) => {
    searchRoleType(event.target.value)
  }

  const onPublicChange = (event: React.ChangeEvent<{ value: '0' | '1' | '2' }>) => {
    changeIsPublic(event.target.value)
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <SingleAutoComplete
        width={isChinese ? 210 : 250}
        pageKeywordName={keywordName}
        placeholder={t('news.searchPlaceholder')}
        onSubmit={onInputSearch}
        options={currentKeyWord}
      />
      <div>
        <CountryRoleTypeSelect onSelectChange={onSelectChange} />
        <Select
          defaultValue=''
          inputProps={{ placeholder: t('news.selectPublicPlaceholder'), style: { color: 'transparent' } }}
          width={isChinese ? 140 : 200}
          onChange={onPublicChange}
        >
          <MenuItem value='0'>{t('select.all')}</MenuItem>
          <MenuItem value='1'>{t('select.published')}</MenuItem>
          <MenuItem value='2'>{t('select.scheduling')}</MenuItem>
        </Select>
      </div>
    </Box>
  )
}

export default Control
